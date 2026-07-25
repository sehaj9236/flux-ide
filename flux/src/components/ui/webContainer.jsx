"use client";
import React, { useEffect, useState, useRef } from "react";
import { CheckCircle, Loader2, XCircle, RefreshCw, Copy, Check } from "lucide-react";
// Adjust path if needed
import { mapToWebContainerTree } from "@/lib/webcontainer"; 
import { TerminalComponent } from "./terminal";

export const WebContainerPreview = ({
  templateData,
  error,
  instance,
  isLoading,
  serverUrl,
  writeFileSync,
  forceResetup = false,
}) => {
  const [previewUrl, setPreviewUrl] = useState("");
  
  // --- NEW: Editable Address Bar State ---
  const [inputUrl, setInputUrl] = useState("");

  const [loadingState, setLoadingState] = useState({
    transforming: false,
    mounting: false,
    installing: false,
    starting: false,
    ready: false,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;
  const [setupError, setSetupError] = useState(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isSetupInProgress, setIsSetupInProgress] = useState(false);

  // --- VERTICAL RESIZER STATE ---
  const [terminalHeight, setTerminalHeight] = useState(256);
  const [isTerminalDragging, setIsTerminalDragging] = useState(false);

  // --- IFRAME REFRESH STATE ---
  const [iframeKey, setIframeKey] = useState(0);
  
  // --- URL COPY STATE ---
  const [isCopied, setIsCopied] = useState(false);

  const terminalRef = useRef(null);
  const serverProcessRef = useRef(null);

  // --- VERTICAL RESIZER LOGIC ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isTerminalDragging) return;
      const newHeight = window.innerHeight - e.clientY;
      if (newHeight >= 100 && newHeight <= window.innerHeight * 0.8) {
        setTerminalHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsTerminalDragging(false);
    };

    if (isTerminalDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isTerminalDragging]);

  // Reset setup state when forceResetup changes
  useEffect(() => {
    if (forceResetup) {
      setIsSetupComplete(false);
      setIsSetupInProgress(false);
      setPreviewUrl("");
      setInputUrl(""); // Reset input field too
      setCurrentStep(0);
      setLoadingState({
        transforming: false,
        mounting: false,
        installing: false,
        starting: false,
        ready: false,
      });
    }
  }, [forceResetup]);

  useEffect(() => {
    async function setupContainer() {
      if (!instance || isSetupComplete || isSetupInProgress) return;

      try {
        setIsSetupInProgress(true);
        setSetupError(null);

        try {
          const packageJsonExists = await instance.fs.readFile(
            "package.json",
            "utf8"
          );

          if (packageJsonExists) {
            if (terminalRef.current?.writeToTerminal) {
              terminalRef.current.writeToTerminal(
                "🔄 Reconnecting to existing WebContainer session...\r\n"
              );
            }

            instance.on("server-ready", (port, url) => {
              if (terminalRef.current?.writeToTerminal) {
                terminalRef.current.writeToTerminal(
                  `🌐 Reconnected to server at ${url}\r\n`
                );
              }

              setPreviewUrl(url);
              setInputUrl(url); // Set initial input value
              setLoadingState((prev) => ({
                ...prev,
                starting: false,
                ready: true,
              }));
            });

            setCurrentStep(4);
            setLoadingState((prev) => ({ ...prev, starting: true }));
            return;
          }
        } catch (error) {}

        // Step-1 transform data
        setLoadingState((prev) => ({ ...prev, transforming: true }));
        setCurrentStep(1);
        
        if (terminalRef.current?.writeToTerminal) {
          terminalRef.current.writeToTerminal(
            "🔄 Transforming template data...\r\n"
          );
        }

        const items = templateData?.content?.items || templateData?.items || [];
        const files = mapToWebContainerTree(items); 
        
        setLoadingState((prev) => ({
          ...prev,
          transforming: false,
          mounting: true,
        }));
        setCurrentStep(2);

        // Step-2 Mount Files
        if (terminalRef.current?.writeToTerminal) {
          terminalRef.current.writeToTerminal(
            "📁 Mounting files to WebContainer...\r\n"
          );
        }
        await instance.mount(files);

        if (terminalRef.current?.writeToTerminal) {
          terminalRef.current.writeToTerminal(
            "✅ Files mounted successfully\r\n"
          );
        }
        setLoadingState((prev) => ({
          ...prev,
          mounting: false,
          installing: true,
        }));
        setCurrentStep(3);

        // Step-3 Install dependencies
        if (terminalRef.current?.writeToTerminal) {
          terminalRef.current.writeToTerminal(
            "📦 Installing dependencies...\r\n"
          );
        }

        const installProcess = await instance.spawn("npm", ["install"]);

        installProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              if (terminalRef.current?.writeToTerminal) {
                terminalRef.current.writeToTerminal(data);
              }
            },
          })
        );

        const installExitCode = await installProcess.exit;

        if (installExitCode !== 0) {
          throw new Error(
            `Failed to install dependencies. Exit code: ${installExitCode}`
          );
        }

        if (terminalRef.current?.writeToTerminal) {
          terminalRef.current.writeToTerminal(
            "✅ Dependencies installed successfully\r\n"
          );
        }

        setLoadingState((prev) => ({
          ...prev,
          installing: false,
          starting: true,
        }));
        setCurrentStep(4);

        // STEP-4 Start The Server
        if (terminalRef.current?.writeToTerminal) {
          terminalRef.current.writeToTerminal(
            "🚀 Starting development server...\r\n"
          );
        }

        let startCommandArgs = ["run", "dev"];
        try {
          const packageJsonContent = await instance.fs.readFile("package.json", "utf8");
          const packageJson = JSON.parse(packageJsonContent);
          
          if (packageJson.scripts && !packageJson.scripts.dev && packageJson.scripts.start) {
            startCommandArgs = ["start"];
          }
        } catch (e) {
          console.warn("Could not parse package.json to determine start command.", e);
        }

        serverProcessRef.current = await instance.spawn("npm", startCommandArgs);

        instance.on("server-ready", (port, url) => {
          if (terminalRef.current?.writeToTerminal) {
            terminalRef.current.writeToTerminal(
              `🌐 Server ready at ${url}\r\n`
            );
          }
          setPreviewUrl(url);
          setInputUrl(url); // Set initial input value
          setLoadingState((prev) => ({
            ...prev,
            starting: false,
            ready: true,
          }));
          setIsSetupComplete(true);
          setIsSetupInProgress(false);
        });

        serverProcessRef.current.output.pipeTo(
          new WritableStream({
            write(data) {
              if (terminalRef.current?.writeToTerminal) {
                terminalRef.current.writeToTerminal(data);
              }
            },
          })
        );
      } catch (err) {
        console.error("Error setting up container:", err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        if (terminalRef.current?.writeToTerminal) {
          terminalRef.current.writeToTerminal(`❌ Error: ${errorMessage}\r\n`);
        }
        setSetupError(errorMessage);
        setIsSetupInProgress(false);
        setLoadingState({
          transforming: false,
          mounting: false,
          installing: false,
          starting: false,
          ready: false,
        });
      }
    }

    setupContainer();

    return () => {
      if (serverProcessRef.current) {
        serverProcessRef.current.kill();
        serverProcessRef.current = null;
      }
    };
  }, [instance, templateData, isSetupComplete, isSetupInProgress]);

  // --- NEW: Listen for route changes from the iframe ---
  useEffect(() => {
    const handleMessage = (event) => {
      // Security check: Make sure we only process our custom route-change events
      if (event.data && event.data.type === "ROUTE_CHANGE") {
        const newPath = event.data.pathname;
        
        // Update the input address bar by combining the base URL and the new path
        setInputUrl((currentInputUrl) => {
          if (!currentInputUrl) return currentInputUrl;
          try {
            const baseUrl = new URL(currentInputUrl).origin;
            return `${baseUrl}${newPath}`;
          } catch (e) {
            return currentInputUrl;
          }
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleRefresh = () => {
    // If they typed something but didn't hit enter, force sync it on refresh
    setPreviewUrl(inputUrl);
    setIframeKey((prev) => prev + 1);
  };

  // --- Handle Address Bar Enter Key ---
  const handleAddressBarKeyDown = (e) => {
    if (e.key === "Enter") {
      setPreviewUrl(inputUrl);
    }
  };

  const handleCopyUrl = async () => {
    if (!inputUrl) return;
    try {
      await navigator.clipboard.writeText(inputUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md p-6 rounded-lg bg-gray-50 dark:bg-gray-900">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500 mx-auto" />
          <h3 className="text-lg font-medium">Initializing WebContainer</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Setting up the environment for your project...
          </p>
        </div>
      </div>
    );
  }

  if (error || setupError) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-lg max-w-md">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="h-5 w-5" />
            <h3 className="font-semibold">Error</h3>
          </div>
          <p className="text-sm">{error || setupError}</p>
        </div>
      </div>
    );
  }

  const getStepIcon = (stepIndex) => {
    if (stepIndex < currentStep) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (stepIndex === currentStep) {
      return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
    } else {
      return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStepText = (stepIndex, label) => {
    const isActive = stepIndex === currentStep;
    const isComplete = stepIndex < currentStep;

    return (
      <span
        className={`text-sm font-medium ${
          isComplete
            ? "text-green-600"
            : isActive
            ? "text-blue-600"
            : "text-gray-500"
        }`}
      >
        {label}
      </span>
    );
  };

  return (
    <div className={`h-full w-full flex flex-col ${isTerminalDragging ? "select-none" : ""}`}>
      {!previewUrl ? (
        <div className="h-full flex flex-col">
          <div className="w-full max-w-md p-6 m-5 rounded-lg bg-white dark:bg-[#1e1e1e] shadow-sm mx-auto border border-gray-200 dark:border-[#2b2b2b]">
            <div className="w-full bg-gray-200 dark:bg-[#2b2b2b] rounded-full h-2 mb-6 overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }} 
              ></div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                {getStepIcon(1)}
                {getStepText(1, "Transforming template data")}
              </div>
              <div className="flex items-center gap-3">
                {getStepIcon(2)}
                {getStepText(2, "Mounting files")}
              </div>
              <div className="flex items-center gap-3">
                {getStepIcon(3)}
                {getStepText(3, "Installing dependencies")}
              </div>
              <div className="flex items-center gap-3">
                {getStepIcon(4)}
                {getStepText(4, "Starting development server")}
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 border-t border-[#2b2b2b]">
            <TerminalComponent
              ref={terminalRef}
              webContainerInstance={instance}
              theme="dark"
              className="h-full"
            />
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col">
          
          {/* --- EDITABLE TOOLBAR & ADDRESS BAR --- */}
          <div className="flex items-center gap-2 px-3 py-2 bg-[#252526] border-b border-[#2b2b2b] shrink-0">
            <button
              onClick={handleRefresh}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-[#3c3c3c] rounded-md transition-all active:scale-95"
              title="Refresh Preview"
            >
              <RefreshCw size={16} />
            </button>

            <div className="flex-1 flex items-center justify-between bg-[#121212] border border-[#3c3c3c] px-3 py-1 rounded text-sm font-mono group focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 transition-all">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyDown={handleAddressBarKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-gray-300 w-full mr-2"
                spellCheck={false}
              />
              <button 
                onClick={handleCopyUrl}
                className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all focus:opacity-100 p-1 rounded hover:bg-[#2b2b2b] shrink-0"
                title="Copy URL"
              >
                {isCopied ? (
                  <Check size={14} className="text-green-500" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
          </div>

          {/* Preview Iframe Wrapper */}
          <div className={`flex-1 relative ${isTerminalDragging ? "pointer-events-none" : ""}`}>
            <iframe
              key={iframeKey}
              src={previewUrl} // The iframe navigates whenever previewUrl changes
              className="absolute inset-0 w-full h-full border-none bg-white"
              title="WebContainer Preview"
              sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups"
              allow="cross-origin-isolated"
            />
          </div>

          {/* --- VERTICAL DRAG RESIZER HANDLE --- */}
          <div
            onMouseDown={() => setIsTerminalDragging(true)}
            className={`h-1.5 w-full shrink-0 cursor-row-resize bg-[#2b2b2b] hover:bg-blue-500 transition-colors z-10 ${
              isTerminalDragging ? "bg-blue-500" : ""
            }`}
          />

          {/* Terminal Wrapper */}
          <div 
            className={`relative bg-[#1e1e1e] ${isTerminalDragging ? "pointer-events-none" : ""}`}
            style={{ height: `${terminalHeight}px` }}
          >
            <TerminalComponent
              ref={terminalRef}
              webContainerInstance={instance}
              theme="dark"
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};