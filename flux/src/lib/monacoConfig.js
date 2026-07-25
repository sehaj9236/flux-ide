// lib/monacoConfig.js

export const getEditorLanguage = (filename) => {
  if (!filename) return "plaintext";
  const extension = filename.split('.').pop().toLowerCase();
  
  const languageMap = {
    // Core JavaScript/TypeScript ecosystem
    js: "javascript", jsx: "javascript", ts: "typescript", tsx: "typescript",
    mjs: "javascript", cjs: "javascript",
    
    // Modern JS Frameworks
    vue: "html", 
    svelte: "html", 
    astro: "html", 
    hbs: "handlebars",
    
    // Web Core (HTML/CSS) & Data Formats
    json: "json", html: "html", htm: "html", css: "css",
    scss: "scss", sass: "scss", less: "less",
    
    // Config & Documentation
    md: "markdown", markdown: "markdown", mdx: "markdown", xml: "xml",
    yaml: "yaml", yml: "yaml", toml: "ini", ini: "ini", conf: "ini", env: "ini"
  };
  
  return languageMap[extension] || "plaintext";
};

export const configureMonaco = (monaco) => {
  // Define a beautiful modern dark theme
  monaco.editor.defineTheme("modern-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "7C7C7C", fontStyle: "italic" },
      { token: "comment.line", foreground: "7C7C7C", fontStyle: "italic" },
      { token: "comment.block", foreground: "7C7C7C", fontStyle: "italic" },
      { token: "keyword", foreground: "C586C0", fontStyle: "bold" },
      { token: "keyword.control", foreground: "C586C0", fontStyle: "bold" },
      { token: "keyword.operator", foreground: "D4D4D4" },
      // Explicit JS/TS fallbacks
      { token: "keyword.js", foreground: "C586C0", fontStyle: "bold" },
      { token: "keyword.ts", foreground: "C586C0", fontStyle: "bold" },
      { token: "keyword.tsx", foreground: "C586C0", fontStyle: "bold" },
      { token: "identifier", foreground: "9CDCFE" },
      { token: "type.identifier", foreground: "4EC9B0" },
      { token: "delimiter", foreground: "D4D4D4" },
      { token: "delimiter.angle", foreground: "808080" },
      { token: "string", foreground: "CE9178" },
      { token: "string.quoted", foreground: "CE9178" },
      { token: "string.template", foreground: "CE9178" },
      { token: "number", foreground: "B5CEA8" },
      { token: "number.hex", foreground: "B5CEA8" },
      { token: "number.float", foreground: "B5CEA8" },
      { token: "entity.name.function", foreground: "DCDCAA" },
      { token: "support.function", foreground: "DCDCAA" },
      { token: "variable", foreground: "9CDCFE" },
      { token: "variable.parameter", foreground: "9CDCFE" },
      { token: "variable.other", foreground: "9CDCFE" },
      { token: "entity.name.type", foreground: "4EC9B0" },
      { token: "support.type", foreground: "4EC9B0" },
      { token: "storage.type", foreground: "569CD6" },
      { token: "entity.name.class", foreground: "4EC9B0" },
      { token: "support.class", foreground: "4EC9B0" },
      { token: "constant", foreground: "4FC1FF" },
      { token: "constant.language", foreground: "569CD6" },
      { token: "constant.numeric", foreground: "B5CEA8" },
      { token: "punctuation", foreground: "D4D4D4" },
      { token: "tag", foreground: "569CD6" },
      { token: "tag.id", foreground: "9CDCFE" },
      { token: "tag.class", foreground: "92C5F8" },
      { token: "attribute.name", foreground: "9CDCFE" },
      { token: "attribute.value", foreground: "CE9178" },
      { token: "attribute.name.css", foreground: "9CDCFE" },
      { token: "attribute.value.css", foreground: "CE9178" },
      { token: "property-name.css", foreground: "9CDCFE" },
      { token: "property-value.css", foreground: "CE9178" },
      { token: "key", foreground: "9CDCFE" },
      { token: "string.key", foreground: "9CDCFE" },
      { token: "string.value", foreground: "CE9178" },
      { token: "invalid", foreground: "F44747", fontStyle: "underline" },
      { token: "invalid.deprecated", foreground: "D4D4D4", fontStyle: "strikethrough" },
    ],
    colors: {
      "editor.background": "#121212",
      "editor.foreground": "#ffffff",
      "editorLineNumber.foreground": "#7D8590",
      "editorLineNumber.activeForeground": "#F0F6FC",
      "editorCursor.foreground": "#F0F6FC",
      "editor.selectionBackground": "#264F78",
      "editor.selectionHighlightBackground": "#ADD6FF26",
      "editor.inactiveSelectionBackground": "#3A3D41",
      "editor.lineHighlightBackground": "#21262D",
      "editor.lineHighlightBorder": "#30363D",
      "editorGutter.background": "#121212",
      "editorGutter.modifiedBackground": "#121212",
      "editorGutter.addedBackground": "#121212",
      "editorGutter.deletedBackground": "#121212",
      "scrollbar.shadow": "#0008",
      "scrollbarSlider.background": "#6E768166",
      "scrollbarSlider.hoverBackground": "#6E768188",
      "scrollbarSlider.activeBackground": "#6E7681BB",
      "minimap.background": "#161B22",
      "minimap.selectionHighlight": "#264F78",
      "editor.findMatchBackground": "#9E6A03",
      "editor.findMatchHighlightBackground": "#F2CC6080",
      "editor.findRangeHighlightBackground": "#3FB95040",
      "editor.wordHighlightBackground": "#575757B8",
      "editor.wordHighlightStrongBackground": "#004972B8",
      "editorBracketMatch.background": "#0064001A",
      "editorBracketMatch.border": "#888888",
      "editorIndentGuide.background": "#21262D",
      "editorIndentGuide.activeBackground": "#30363D",
      "editorRuler.foreground": "#21262D",
      "editorWhitespace.foreground": "#6E7681",
      "editorError.foreground": "#F85149",
      "editorWarning.foreground": "#D29922",
      "editorInfo.foreground": "#75BEFF",
      "editorHint.foreground": "#EEEEEE",
      "editorSuggestWidget.background": "#161B22",
      "editorSuggestWidget.border": "#30363D",
      "editorSuggestWidget.foreground": "#E6EDF3",
      "editorSuggestWidget.selectedBackground": "#21262D",
      "editorHoverWidget.background": "#161B22",
      "editorHoverWidget.border": "#30363D",
      "panel.background": "#0D1117",
      "panel.border": "#30363D",
      "activityBar.background": "#0D1117",
      "activityBar.foreground": "#E6EDF3",
      "activityBar.border": "#30363D",
      "sideBar.background": "#0D1117",
      "sideBar.foreground": "#E6EDF3",
      "sideBar.border": "#30363D",
    },
  });

  monaco.editor.setTheme("modern-dark");
  
  // --- THE FIX: Ignore specific strict external module, React, & Node errors ---
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
    diagnosticCodesToIgnore: [
      2307, // Cannot find module
      2709, // Cannot use namespace as a type
      2304, // Cannot find name
      2614, // Module has no exported member
      7016, // Could not find a declaration file for module
      2503, // Cannot find namespace (e.g., 'React')
      2874, // JSX tag requires 'React' to be in scope
      2580, // Cannot find name 'require' (Node.js)
    ],
  });
  
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
    diagnosticCodesToIgnore: [
      2307, // Cannot find module
      2709, // Cannot use namespace as a type
      2304, // Cannot find name
      2614, // Module has no exported member
      7016, // Could not find a declaration file for module
      2503, // Cannot find namespace (e.g., 'React')
      2874, // JSX tag requires 'React' to be in scope
      2580, // Cannot find name 'require' (Node.js)
    ],
  });

  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: "React",
    allowJs: true,
    typeRoots: ["node_modules/@types"],
  });

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: "React",
    allowJs: true,
    typeRoots: ["node_modules/@types"],
  });

  // --- THE FIX: Ignore Tailwind CSS @ directives ---
  monaco.languages.css.cssDefaults.setDiagnosticsOptions({
    lint: {
      unknownAtRules: 'ignore'
    }
  });
};

export const defaultEditorOptions = {
  fontSize: 14,
  fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  fontLigatures: true,
  fontWeight: "400",
  minimap: { enabled: true, size: "proportional", showSlider: "mouseover" },
  scrollBeyondLastLine: false,
  automaticLayout: true,
  padding: { top: 16, bottom: 16 },
  lineNumbers: "on",
  lineHeight: 20,
  renderLineHighlight: "all",
  renderWhitespace: "selection",
  tabSize: 2,
  insertSpaces: true,
  detectIndentation: true,
  wordWrap: "on",
  wordWrapColumn: 120,
  wrappingIndent: "indent",
  folding: true,
  foldingHighlight: true,
  foldingStrategy: "indentation",
  showFoldingControls: "mouseover",
  smoothScrolling: true,
  mouseWheelZoom: true,
  fastScrollSensitivity: 5,
  multiCursorModifier: "ctrlCmd",
  selectionHighlight: true,
  occurrencesHighlight: true,
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnEnter: "on",
  tabCompletion: "on",
  wordBasedSuggestions: true,
  quickSuggestions: { other: true, comments: false, strings: false },
  formatOnPaste: true,
  formatOnType: true,
  matchBrackets: "always",
  bracketPairColorization: { enabled: true },
  renderIndentGuides: true,
  highlightActiveIndentGuide: true,
  rulers: [80, 120],
  disableLayerHinting: false,
  disableMonospaceOptimizations: false,
  accessibilitySupport: "auto",
  cursorBlinking: "smooth",
  cursorSmoothCaretAnimation: true,
  cursorStyle: "line",
  cursorWidth: 2,
  find: { addExtraSpaceOnTop: false, autoFindInSelection: "never", seedSearchStringFromSelection: "always" },
  hover: { enabled: true, delay: 300, sticky: true },
  
  // THE MAGIC FIX: Turning off semantic highlighting prevents the TS Server from stripping our colors
  "semanticHighlighting.enabled": false,
  
  stickyScroll: { enabled: true }
};

// --- DYNAMIC KEYWORD HIGHLIGHTING ---
export const setupKeywordHighlighting = (editor, monaco) => {
  if (!document.getElementById('monaco-custom-highlights')) {
    const style = document.createElement('style');
    style.id = 'monaco-custom-highlights';
    style.innerHTML = `
      .monaco-highlight-todo {
        background-color: #BB800933;
        color: #E3B341 !important;
        font-weight: 700;
        border-radius: 4px;
        padding: 0 4px;
        border: 1px solid #BB800966;
      }
      .monaco-highlight-fixme, .monaco-highlight-bug {
        background-color: #F8514933;
        color: #FF7B72 !important;
        font-weight: 700;
        border-radius: 4px;
        padding: 0 4px;
        border: 1px solid #F8514966;
      }
      .monaco-highlight-note {
        background-color: #2F81F733;
        color: #79C0FF !important;
        font-weight: 700;
        border-radius: 4px;
        padding: 0 4px;
        border: 1px solid #2F81F766;
      }
    `;
    document.head.appendChild(style);
  }

  const decorationsCollection = editor.createDecorationsCollection();

  const updateHighlights = () => {
    const model = editor.getModel();
    if (!model) return;

    const text = model.getValue();
    const decorations = [];
    
    const keywords = {
      'TODO': 'monaco-highlight-todo',
      'FIXME': 'monaco-highlight-fixme',
      'BUG': 'monaco-highlight-bug',
      'NOTE': 'monaco-highlight-note'
    };

    Object.keys(keywords).forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        const startPos = model.getPositionAt(match.index);
        const endPos = model.getPositionAt(match.index + keyword.length);
        
        decorations.push({
          range: new monaco.Range(startPos.lineNumber, startPos.column, endPos.lineNumber, endPos.column),
          options: {
            inlineClassName: keywords[keyword],
            stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
            hoverMessage: { value: `**${keyword}** tag detected.` }
          }
        });
      }
    });

    decorationsCollection.set(decorations);
  };

  updateHighlights();

  editor.onDidChangeModelContent(() => {
    updateHighlights();
  });
};