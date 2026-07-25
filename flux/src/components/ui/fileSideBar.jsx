import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  Plus,
  MoreHorizontal,
  FilePlus2,
  FolderPlus,
  Edit2,
  Trash2,
  X,
  PanelLeft, 
  Save, 
  Play, 
  Sparkles, 
  Settings,
  FileCode,
  FileJson,
  FileType2,
  FileImage,
  Loader2 // <-- ADDED THIS IMPORT FOR THE LOADING SPINNER
} from "lucide-react";

// --- HELPER: FILE ICONS BY EXTENSION ---
const FileIcon = ({ name, size = 16, isActive = false }) => {
  const ext = name?.split('.').pop().toLowerCase() || '';
  const baseColor = isActive ? "text-gray-200" : "text-gray-500";
  
  if (!name?.includes('.')) return <File size={size} className={baseColor} />;
  
  switch (ext) {
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
      return <FileCode size={size} className="text-yellow-400" />;
    case 'css':
      return <FileCode size={size} className="text-blue-400" />;
    case 'html':
      return <FileCode size={size} className="text-orange-400" />;
    case 'json':
      return <FileJson size={size} className="text-green-400" />;
    case 'md':
      return <FileType2 size={size} className="text-purple-400" />;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'svg':
      return <FileImage size={size} className="text-pink-400" />;
    default:
      return <File size={size} className={baseColor} />;
  }
};


// --- MODAL COMPONENTS ---
const Dialog = ({ isOpen, onClose, title, description, children, onConfirm, confirmText, confirmVariant = 'default' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
      <div 
        className="w-[450px] bg-[#1a1a1b] border border-[#2b2b2b] rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-300 transition-colors"
        >
          <X size={18} />
        </button>
        
        <h2 className="text-[#e2e2e2] text-xl font-semibold mb-1">{title}</h2>
        {description && <p className="text-sm text-gray-400 mb-6">{description}</p>}
        
        <div className="mb-6">
          {children}
        </div>
        
        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2b] border border-[#3b3b3c] rounded-md transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              confirmVariant === 'danger' 
                ? 'bg-[#ef4444] hover:bg-[#dc2626] text-white' 
                : 'bg-[#f4f4f5] hover:bg-white text-black'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- SIDEBAR ITEM COMPONENT ---
const FileItem = ({ item, level = 0, onAction, onFileClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  
  const isFolder = !!item.items;
  
  // UPDATED: Use fileExtension instead of extension
  const baseName = item.folderName || item.filename || item.name;
  const ext = item.fileExtension ? (item.fileExtension.startsWith('.') ? item.fileExtension : `.${item.fileExtension}`) : '';
  const name = (baseName && ext && !baseName.endsWith(ext)) ? `${baseName}${ext}` : baseName;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else if (onFileClick) {
      onFileClick(item);
    }
  };

  const handleActionClick = (e, actionType) => {
    e.stopPropagation();
    setShowMenu(false);
    onAction(actionType, name, isFolder);
  };

  return (
    <div className="select-none relative">
      <div 
        onClick={handleToggle}
        className="flex items-center py-1 px-2 hover:bg-[#1a1a1b] rounded cursor-pointer text-gray-300 group"
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        <div className="mr-1 w-4 flex justify-center">
          {isFolder && (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        </div>
        <span className="mr-2 text-gray-400">
          {isFolder ? <Folder size={18} className="text-blue-400" /> : <FileIcon name={name} size={18} />}
        </span>
        <span className="flex-grow text-sm truncate">{name}</span>
        
        <div className="relative flex items-center" ref={menuRef}>
          <button 
            type="button"
            className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-white p-1 rounded hover:bg-[#2a2a2b] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); 
              setShowMenu((prev) => !prev);
            }}
          >
            <MoreHorizontal size={16} />
          </button>
          
          {showMenu && (
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="absolute right-0 top-full mt-1 z-50 w-40 rounded-md border border-[#2b2b2b] bg-[#181818] shadow-xl py-1 cursor-default"
            >
              {isFolder && (
                <>
                  <button 
                    onClick={(e) => handleActionClick(e, 'create-file')}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-[#252526] transition-colors"
                  >
                    <FilePlus2 size={16} /> New File
                  </button>
                  <button 
                    onClick={(e) => handleActionClick(e, 'create-folder')}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-[#252526] transition-colors"
                  >
                    <FolderPlus size={16} /> New Folder
                  </button>
                  <div className="border-t border-[#2b2b2b] my-1"></div>
                </>
              )}
              
              <button 
                onClick={(e) => handleActionClick(e, 'rename')}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-[#252526] transition-colors"
              >
                <Edit2 size={16} /> Rename
              </button>
              <button 
                onClick={(e) => handleActionClick(e, 'delete')}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-[#252526] transition-colors"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      {isFolder && isOpen && item.items && (
        <div>
          {item.items.map((child, idx) => (
            <FileItem 
              key={idx} 
              item={child} 
              level={level + 1} 
              onAction={onAction} 
              onFileClick={onFileClick} 
            />
          ))}
        </div>
      )}
    </div>
  );
};


// --- EDITOR HEADER COMPONENT ---

export const EditorHeader = ({ 
  openFiles = [], 
  activeFile = null, 
  onTabClick, 
  onCloseTab,
  onCloseAll,
  onToggleSidebar,
  onSave,       // <-- ADDED THIS PROP
  isSaving,
  template     // <-- ADDED THIS PROP
}) => {
  return (
    <div className="flex flex-col border-b border-[#2b2b2b] bg-[#0f0f10] select-none shrink-0">
      
      {/* Top Action Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1e1e1e]">
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleSidebar}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <PanelLeft size={18} />
          </button>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-gray-200">{template.workspace.title} </span>
            <span className="text-[11px] text-gray-500 font-medium tracking-wide">
              {openFiles.length} file(s) open
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* --- UPDATED SAVE BUTTON --- */}
          <button 
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center justify-center w-8 h-8 text-gray-400 cursor-pointer hover:text-white hover:bg-[#252526] rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
            title="Save"
          >
            {isSaving ? (
              <Loader2 size={16} className="animate-spin text-blue-500" />
            ) : (
              <Save size={16} />
            )}
          </button>
          {/* --------------------------- */}
          
          <button className="flex items-center cursor-pointer gap-1.5 bg-[#f4f4f5] text-black px-3 py-1.5 rounded-md hover:bg-white transition-colors text-xs font-semibold shadow-sm ml-1">
            <Sparkles size={14} className="text-black" /> AI 
          </button>
          
          <button className="p-1.5 text-gray-400 cursor-pointer hover:text-white hover:bg-[#252526] rounded transition-colors ml-1" title="Settings">
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Bottom Tabs List */}
      <div className="flex items-center justify-between px-2 py-1.5 bg-[#121212]">
        <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar flex-1">
          {openFiles.map((file, idx) => {
            const isActive = activeFile?.name === file.name;
            return (
              <div
                key={idx}
                onClick={() => onTabClick && onTabClick(file)}
                className={`group relative flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 text-xs rounded-md border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#252526] text-gray-200 border-[#3e3e42] shadow-sm'
                    : 'bg-transparent text-gray-500 border-transparent hover:bg-[#1e1e1e] hover:text-gray-300'
                }`}
              >
                <FileIcon name={file.name} size={14} isActive={isActive} />
                <span className="truncate pb-[1px]">{file.name}</span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    onCloseTab && onCloseTab(file.name);
                  }}
                  className={`flex items-center justify-center p-0.5 rounded-sm hover:bg-[#3e3e42] transition-all ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  title="Close file"
                >
                  <X size={12} className={isActive ? 'text-gray-300' : 'text-gray-500'} />
                </button>
              </div>
            );
          })}
        </div>

        {openFiles.length > 0 && (
          <button
            onClick={onCloseAll}
            className="text-[11px] font-medium text-gray-500 hover:text-gray-300 whitespace-nowrap px-3 transition-colors"
          >
            Close All
          </button>
        )}
      </div>
    </div>
  );
};

// --- MAIN FILE SIDEBAR COMPONENT ---

export default function FileSidebar({ template, onFileClick, onUpdateTemplate }) {
  const rootItems = template?.content?.items || [];
  const [showMainMenu, setShowMainMenu] = useState(false);
  
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: null, 
    targetName: '',
    isTargetFolder: false
  });

  // UPDATED: formInputs now uses fileExtension
  const [formInputs, setFormInputs] = useState({ filename: '', fileExtension: '', foldername: '', newName: '' });

  const openModal = (type, targetName = 'root', isTargetFolder = true) => {
    setModalConfig({ isOpen: true, type, targetName, isTargetFolder });
    
    setFormInputs({ 
      filename: '', 
      fileExtension: '', 
      foldername: '',
      newName: type === 'rename' ? targetName : ''
    });
  };

  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  const handleAction = (actionType, targetName, isTargetFolder) => {
    openModal(actionType, targetName, isTargetFolder);
  };

  const handleConfirm = () => {
    if (!onUpdateTemplate) {
      console.error("onUpdateTemplate prop is missing. Cannot update file tree.");
      return closeModal();
    }

    const newTemplate = JSON.parse(JSON.stringify(template));
    if (!newTemplate.content) newTemplate.content = { items: [] };
    const items = newTemplate.content.items;

    const { type, targetName } = modalConfig;

    const getFormattedExtension = () => {
      let ext = formInputs.fileExtension.trim();
      if (ext && !ext.startsWith('.')) ext = `.${ext}`;
      return ext;
    };

    if (targetName === 'root') {
      if (type === 'create-file') {
        items.push({ 
          filename: formInputs.filename.trim(), 
          fileExtension: getFormattedExtension(), // UPDATED
          content: "" 
        });
      }
      if (type === 'create-folder') {
        items.push({ folderName: formInputs.foldername.trim(), items: [] });
      }
    } else {
      const applyAction = (list) => {
        for (let i = 0; i < list.length; i++) {
          const current = list[i];
          
          const baseName = current.folderName || current.filename || current.name;
          const currentExt = current.fileExtension ? (current.fileExtension.startsWith('.') ? current.fileExtension : `.${current.fileExtension}`) : ''; // UPDATED
          const currentName = (baseName && currentExt && !baseName.endsWith(currentExt)) ? `${baseName}${currentExt}` : baseName;

          if (currentName === targetName) {
            if (type === 'delete') {
              list.splice(i, 1);
              return true;
            }
            if (type === 'rename') {
              if (current.folderName) current.folderName = formInputs.newName.trim();
              if (current.filename) {
                current.filename = formInputs.newName.trim();
              }
              return true;
            }
            if (type === 'create-file') {
              if (!current.items) current.items = [];
              current.items.push({ 
                filename: formInputs.filename.trim(), 
                fileExtension: getFormattedExtension(), // UPDATED
                content: "" 
              });
              return true;
            }
            if (type === 'create-folder') {
              if (!current.items) current.items = [];
              current.items.push({ folderName: formInputs.foldername.trim(), items: [] });
              return true;
            }
          }

          if (current.items && current.items.length > 0) {
            if (applyAction(current.items)) return true;
          }
        }
        return false;
      };

      applyAction(items);
    }

    onUpdateTemplate(newTemplate);
    closeModal();
  };

  return (
    <>
      <div className="w-64 h-screen p-4 text-gray-200 border-r border-[#2b2b2b] bg-[#121212] overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">File Explorer</h2>
          <div className='relative'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMainMenu((prev) => !prev);
              }}
              className="p-1 rounded hover:bg-[#1f1f1f] transition"
            >
              <Plus size={18} className="cursor-pointer hover:text-white" />
            </button>
            
            {showMainMenu && (
              <div className="absolute right-0 top-8 z-50 w-48 rounded-md border border-[#2b2b2b] bg-[#181818] shadow-xl overflow-hidden">
                <button 
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-[#252526] transition" 
                  onClick={() => { setShowMainMenu(false); openModal('create-file'); }}
                >
                  <FilePlus2 size={16} /> New File
                </button>
                <button 
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-[#252526] transition" 
                  onClick={() => { setShowMainMenu(false); openModal('create-folder'); }}
                >
                  <FolderPlus size={16} /> New Folder
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-0.5">
          {rootItems.map((item, idx) => (
            <FileItem 
              key={idx} 
              item={item} 
              onAction={handleAction} 
              onFileClick={onFileClick} 
            />
          ))}
        </div>
      </div>

      {/* --- RENDER MODALS --- */}

      <Dialog 
        isOpen={modalConfig.isOpen && modalConfig.type === 'create-file'}
        onClose={closeModal}
        title="Create New File"
        description="Enter a name for the new file and select its extension."
        confirmText="Create"
        onConfirm={handleConfirm}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="w-20 text-sm font-medium text-gray-300">Filename</label>
            <input 
              autoFocus
              value={formInputs.filename}
              onChange={(e) => setFormInputs({...formInputs, filename: e.target.value})}
              className="flex-1 bg-[#121212] border border-[#2b2b2b] rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="w-20 text-sm font-medium text-gray-300">Extension</label>
            <input 
              value={formInputs.fileExtension} // UPDATED
              onChange={(e) => setFormInputs({...formInputs, fileExtension: e.target.value})}
              className="flex-1 bg-[#121212] border border-[#2b2b2b] rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500 transition-colors"
            />
          </div>
        </div>
      </Dialog>

      <Dialog 
        isOpen={modalConfig.isOpen && modalConfig.type === 'create-folder'}
        onClose={closeModal}
        title="Create New Folder"
        description="Enter a name for the new folder."
        confirmText="Create"
        onConfirm={handleConfirm}
      >
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm font-medium text-gray-300">Folder Name</label>
          <input 
            autoFocus
            value={formInputs.foldername}
            onChange={(e) => setFormInputs({...formInputs, foldername: e.target.value})}
            className="flex-1 bg-[#121212] border border-[#2b2b2b] rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500 transition-colors"
          />
        </div>
      </Dialog>

      <Dialog 
        isOpen={modalConfig.isOpen && modalConfig.type === 'rename'}
        onClose={closeModal}
        title={`Rename ${modalConfig.isTargetFolder ? 'Folder' : 'File'}`}
        description={`Enter a new name for "${modalConfig.targetName}".`}
        confirmText="Rename"
        onConfirm={handleConfirm}
      >
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm font-medium text-gray-300">New Name</label>
          <input 
            autoFocus
            value={formInputs.newName}
            onChange={(e) => setFormInputs({...formInputs, newName: e.target.value})}
            className="flex-1 bg-[#121212] border border-[#2b2b2b] rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500 transition-colors"
          />
        </div>
      </Dialog>

      <Dialog 
        isOpen={modalConfig.isOpen && modalConfig.type === 'delete'}
        onClose={closeModal}
        title={`Delete ${modalConfig.isTargetFolder ? 'Folder' : 'File'}`}
        description={`Are you sure you want to delete "${modalConfig.targetName}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={handleConfirm}
      />
    </>
  );
}