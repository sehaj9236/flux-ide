"use client"
import FileSidebar, { EditorHeader } from "@/components/ui/fileSideBar";
import apiClient from "@/lib/axios";
import { useParams } from "next/navigation";
import { Code2, Terminal, ArrowLeft, Home } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { getEditorLanguage, configureMonaco, defaultEditorOptions, setupKeywordHighlighting } from "@/lib/monacoConfig";
import { getWebContainer } from "@/lib/webcontainer";
import { WebContainerPreview } from "@/components/ui/webContainer";
import Link from "next/link";
import { toast } from 'sonner';

const MainPlayground = () => {
  const { id } = useParams();
  
  // --- Debounce Timer Ref ---
  const saveTimerRef = useRef(null);

  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [openFiles, setOpenFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [webContainerInstance, setWebContainerInstance] = useState(null);
  const [forceResetup, setForceResetup] = useState(false);

  const [previewWidth, setPreviewWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  
  // --- SAVE STATE ---
  const [isSaving, setIsSaving] = useState(false);

  // 1. Initialize WebContainer when the page loads
  useEffect(() => {
    const initWebContainer = async () => {
      try {
        const instance = await getWebContainer();
        setWebContainerInstance(instance);
      } catch (err) {
        console.error("Failed to boot WebContainer:", err);
      }
    };
    initWebContainer();
  }, []);

  // 2. Handle Dragging for the Resizer
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const newWidthPercentage = ((window.innerWidth - e.clientX) / window.innerWidth) * 100;
      if (newWidthPercentage >= 15 && newWidthPercentage <= 60) {
        setPreviewWidth(newWidthPercentage);
      }
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // 3. Fetch Template Data with Auto-Retry (Fixes Race Condition)
  useEffect(() => {
    let isMounted = true;

    const fetchTemplate = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      const maxRetries = 3;
      const retryDelay = 1500; // Wait 1.5 seconds between attempts

      for (let i = 0; i < maxRetries; i++) {
        try {
          const response = await apiClient.post(`/api/template/${id}`);
          
          if (isMounted) {
            setTemplate(response.data.data);
            setLoading(false);
          }
          return; // Success! Exit the loop

        } catch (err) {
          console.warn(`Fetch attempt ${i + 1} failed. Retrying...`);
          
          if (i === maxRetries - 1) {
            // If this was the last attempt, show the error
            if (isMounted) {
              console.error("Failed to fetch template:", err);
              setError(err.response?.data?.message || "Error loading template");
              setLoading(false);
            }
          } else {
            // Wait before trying again
            await new Promise(res => setTimeout(res, retryDelay));
          }
        }
      }
    };

    fetchTemplate();

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks if component unmounts early
    };
  }, [id]);

  // --- SAFE TWO-WAY SYNC (Specifically for package.json) ---
  useEffect(() => {
    if (!webContainerInstance) return;

    let watcher;

    const setupSafeWatcher = () => {
      try {
        watcher = webContainerInstance.fs.watch('/', { recursive: false }, async (event, filename) => {
          if (filename !== 'package.json') return;

          try {
            const latestContent = await webContainerInstance.fs.readFile('package.json', 'utf-8');

            setOpenFiles((prevFiles) => {
              const fileIsOpen = prevFiles.find((f) => f.fullPath === 'package.json');
              
              if (fileIsOpen && fileIsOpen.content !== latestContent) {
                setActiveFile((prevActive) => {
                  if (prevActive?.fullPath === 'package.json') {
                    return { ...prevActive, content: latestContent };
                  }
                  return prevActive;
                });

                if (fileIsOpen.originalNode) {
                  fileIsOpen.originalNode.content = latestContent;
                  setTemplate((prev) => ({ ...prev }));
                }

                return prevFiles.map((f) => 
                  f.fullPath === 'package.json' ? { ...f, content: latestContent } : f
                );
              }
              return prevFiles;
            });
          } catch (err) {
            // Ignore temporary read errors
          }
        });
      } catch (err) {
        console.error("Failed to setup safe watcher:", err);
      }
    };

    setupSafeWatcher();

    return () => {
      if (watcher && typeof watcher.close === 'function') watcher.close();
    };
  }, [webContainerInstance]);
  // --------------------------------------------------------------

  const getFullPathByReference = (items, targetNode, currentPath = '') => {
    for (let item of items) {
      const baseName = item.filename || item.name || item.folderName || '';
      const ext = item.fileExtension ? (item.fileExtension.startsWith('.') ? item.fileExtension : `.${item.fileExtension}`) : '';
      const fullName = (baseName && ext && !baseName.endsWith(ext)) ? `${baseName}${ext}` : baseName;

      if (item === targetNode) return `${currentPath}${fullName}`;

      if (item.items) {
        const found = getFullPathByReference(item.items, targetNode, `${currentPath}${fullName}/`);
        if (found) return found;
      }
    }
    return null;
  };

  const handleFileSelect = (file) => {
    const templateItems = template?.content?.items || template?.items || [];
    const fullPath = getFullPathByReference(templateItems, file) || file.name || file.filename || "unknown";
    const existingFile = openFiles.find(f => f.fullPath === fullPath);

    if (existingFile) {
      setActiveFile(existingFile);
    } else {
      const rawContent = file.content || ""; 
      const cleanContent = typeof rawContent === 'string' 
        ? rawContent.replace(/\\n/g, '\n').replace(/\\"/g, '"') 
        : "";

      const baseName = file.filename || file.folderName || file.name;
      const ext = file.fileExtension ? (file.fileExtension.startsWith('.') ? file.fileExtension : `.${file.fileExtension}`) : '';
      const shortName = (baseName && ext && !baseName.endsWith(ext)) ? `${baseName}${ext}` : baseName;

      const newFileObj = {
        name: fullPath, 
        shortName: shortName,
        fullPath: fullPath,
        content: cleanContent,
        originalContent: cleanContent,
        originalNode: file
      };

      setOpenFiles((prev) => [...prev, newFileObj]);
      setActiveFile(newFileObj);
    }
  };

  const handleCloseTab = (fileName) => {
    const updatedTabs = openFiles.filter((f) => f.name !== fileName);
    setOpenFiles(updatedTabs);
    
    if (activeFile?.name === fileName) {
      setActiveFile(updatedTabs.length > 0 ? updatedTabs[updatedTabs.length - 1] : null);
    }
  };

  // --- MANUAL SAVE HANDLER ---
  const handleManualSave = async () => {
    if (!template) return;

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    try {
      setIsSaving(true);
      
      await apiClient.patch(`/api/template/${id}/save`, {
        fullStructure: template.content 
      });

      toast.success("Project Saved Successfully");
    } catch (error) {
      console.error("Manual save failed:", error);
      toast.error("Failed to Save Project");
    } finally {
      setIsSaving(false);
    }
  };

  // --- AUTO-SAVE HANDLER ---
  const handleEditorChange = async (newContent) => {
    if (activeFile) {
      // 1. INSTANT LOCAL UPDATES
      const updatedFile = { ...activeFile, content: newContent };
      setActiveFile(updatedFile);
      setOpenFiles((prev) => 
        prev.map((f) => (f.fullPath === activeFile.fullPath ? updatedFile : f))
      );

      const updatedTemplate = { ...template };

      if (activeFile.originalNode) {
        activeFile.originalNode.content = newContent;
        setTemplate(updatedTemplate);
      }

      // 2. INSTANT WEBCONTAINER SYNC
      if (webContainerInstance) {
        try {
          const pathParts = activeFile.fullPath.split('/');
          if (pathParts.length > 1) {
            const dirPath = pathParts.slice(0, -1).join('/');
            await webContainerInstance.fs.mkdir(dirPath, { recursive: true });
          }
          await webContainerInstance.fs.writeFile(activeFile.fullPath, newContent);
        } catch (err) {
          console.error(`Failed to write to WebContainer at path: ${activeFile.fullPath}`, err);
        }
      }

      // 3. DEBOUNCED DATABASE AUTOSAVE
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }

      saveTimerRef.current = setTimeout(async () => {
        try {
          await apiClient.patch(`/api/template/${id}/save`, {
            fullStructure: updatedTemplate.content
          });
        } catch (error) {
          console.error("Auto-save failed:", error);
        }
      }, 1500); 
    }
  };

  const handleEditorWillMount = (monaco) => configureMonaco(monaco);
  const handleEditorDidMount = (editor, monaco) => setupKeywordHighlighting(editor, monaco);

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-[#121212] text-white">Loading Playground...</div>;
  if (error) return <div className="h-screen w-full flex items-center justify-center bg-[#121212] text-red-500">Error: {error}</div>;

  return (
    <div className={`flex h-screen bg-[#121212] overflow-hidden ${isDragging ? "select-none" : ""}`}>
      
      {/* SIDEBAR */}
      <div 
        className={`flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out overflow-hidden border-[#2b2b2b] ${
          isSidebarOpen ? "w-64 border-r" : "w-0 border-r-0"
        }`}
      >
        <div className="w-64 flex flex-col h-full">
          
          {/* BACK TO HOME BUTTON */}
          <div className="flex-shrink-0 border-b border-[#2b2b2b]">
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-full group p-4"
            >
              <div className="bg-[#1e1e1e] p-1.5 rounded-md border border-[#2b2b2b] group-hover:border-gray-500 transition-colors">
                <ArrowLeft size={16} />
              </div>
              <span className="text-sm font-medium tracking-wide flex items-center gap-1.5">
                
               
              </span>
            </Link>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <FileSidebar 
              template={template} 
              onFileClick={handleFileSelect} 
              onUpdateTemplate={setTemplate} 
            />
          </div>
        </div>
      </div>

      {/* EDITOR PANE */}
      <div className={`flex-1 flex flex-col min-w-0 ${isDragging ? "pointer-events-none" : ""}`}>
        <EditorHeader 
          openFiles={openFiles} 
          activeFile={activeFile}
          onTabClick={setActiveFile} 
          onCloseTab={handleCloseTab} 
          onCloseAll={() => {
            setOpenFiles([]);
            setActiveFile(null);
          }}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onSave={handleManualSave}
          isSaving={isSaving}
          template={template}
          
        />
        
        <div className="flex-1 relative">
          {activeFile ? (
            <Editor
              height="100%"
              theme="modern-dark"
              path={activeFile.name}
              language={getEditorLanguage(activeFile.name)}
              value={activeFile.content}
              onChange={handleEditorChange}
              beforeMount={handleEditorWillMount}
              onMount={handleEditorDidMount} 
              options={defaultEditorOptions} 
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-[#0f0f10] animate-in fade-in duration-500">
              <div className="relative mb-6 flex items-center justify-center">
                <div className="absolute w-32 h-32 bg-blue-500/10 blur-3xl rounded-full animate-pulse"></div>
                <div className="relative bg-[#1a1a1b] p-6 rounded-2xl border border-[#2b2b2b] shadow-2xl transition-transform hover:scale-105 duration-300">
                  <Code2 size={56} className="text-gray-400" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-200 mb-2 tracking-wide">Flux Playground</h3>
              <p className="text-sm text-gray-500">Select a file from the sidebar to start building</p>
            </div>
          )}
        </div>
      </div>

      {/* RESIZER */}
      <div
        onMouseDown={() => setIsDragging(true)}
        className={`w-1.5 shrink-0 cursor-col-resize bg-[#2b2b2b] hover:bg-blue-500 transition-colors z-10 ${
          isDragging ? "bg-blue-500" : ""
        }`}
      />

      {/* PREVIEW & TERMINAL PANE */}
      <div 
        className={`flex flex-col bg-[#1e1e1e] relative shrink-0 ${isDragging ? "pointer-events-none" : ""}`}
        style={{ width: `${previewWidth}%` }}
      >
        <WebContainerPreview 
          templateData={template}
          instance={webContainerInstance}
          isLoading={loading}
          error={error}
          forceResetup={forceResetup}
        />
      </div>
    </div>
  );
};

export default MainPlayground;