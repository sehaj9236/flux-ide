    import fs from 'fs/promises';
import path from 'path';

/**
 * Scans a template directory and returns a structured JSON representation
 */
export async function scanTemplateDirectory(templatePath, options = {}) {
  // Set default options
  const defaultOptions = {
    ignoreFiles: [
      'package-lock.json', 'yarn.lock', '.DS_Store', 'thumbs.db',
      '.gitignore', '.npmrc', '.yarnrc', '.env', '.env.local',
      '.env.development', '.env.production'
    ],
    ignoreFolders: [
      'node_modules', '.git', '.vscode', '.idea', 'dist', 'build', 'coverage'
    ],
    ignorePatterns: [
      /^\..+\.swp$/, // Vim swap files
      /^\.#/,        // Emacs backup files
      /~$/           // Backup files
    ],
    maxFileSize: 1024 * 1024 // 1MB
  };

  // Merge options
  const mergedOptions = {
    ignoreFiles: [...(defaultOptions.ignoreFiles || []), ...(options.ignoreFiles || [])],
    ignoreFolders: [...(defaultOptions.ignoreFolders || []), ...(options.ignoreFolders || [])],
    ignorePatterns: [...(defaultOptions.ignorePatterns || []), ...(options.ignorePatterns || [])],
    maxFileSize: options.maxFileSize !== undefined ? options.maxFileSize : defaultOptions.maxFileSize
  };

  if (!templatePath) throw new Error('Template path is required');

  const stats = await fs.stat(templatePath);
  if (!stats.isDirectory()) throw new Error(`'${templatePath}' is not a directory`);

  const folderName = path.basename(templatePath);
  return processDirectory(folderName, templatePath, mergedOptions);
}

/**
 * Process a directory and its contents recursively
 */
async function processDirectory(folderName, folderPath, options) {
  const entries = await fs.readdir(folderPath, { withFileTypes: true });
  const items = [];

  for (const entry of entries) {
    const entryName = entry.name;
    const entryPath = path.join(folderPath, entryName);

    if (entry.isDirectory()) {
      if (options.ignoreFolders.includes(entryName)) continue;
      items.push(await processDirectory(entryName, entryPath, options));
    } else if (entry.isFile()) {
      if (options.ignoreFiles.includes(entryName)) continue;
      if (options.ignorePatterns.some(pattern => pattern.test(entryName))) continue;

      try {
        const stats = await fs.stat(entryPath);
        const parsedPath = path.parse(entryName);
        let content;

        if (options.maxFileSize && stats.size > options.maxFileSize) {
          content = `[File content not included: size (${stats.size} bytes) exceeds maximum allowed size]`;
        } else {
          content = await fs.readFile(entryPath, 'utf8');
        }

        items.push({
          filename: parsedPath.name,
          fileExtension: parsedPath.ext.replace(/^\./, ''),
          content
        });
      } catch (error) {
        console.error(`Error reading file ${entryPath}:`, error);
        items.push({
          filename: path.parse(entryName).name,
          content: `Error reading file: ${error.message}`
        });
      }
    }
  }

  return { folderName, items };
}

/**
 * Saves the template structure to a JSON file
 */
export async function saveTemplateStructureToJson(templatePath, outputPath, options) {
  const structure = await scanTemplateDirectory(templatePath, options);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(structure, null, 2), 'utf8');
}

/**
 * Reads the structure from a JSON file
 */
export async function readTemplateStructureFromJson(filePath) {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}