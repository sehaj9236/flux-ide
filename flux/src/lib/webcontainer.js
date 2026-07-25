// lib/webcontainer.js
import { WebContainer } from '@webcontainer/api';

let webcontainerInstance = null;

export const getWebContainer = async () => {
  if (!webcontainerInstance) {
    webcontainerInstance = await WebContainer.boot();
  }
  return webcontainerInstance;
};

export const mapToWebContainerTree = (items) => {
  const tree = {};
  
  for (const item of items) {
    if (item.folderName) {
      // It's a folder, recursively map its children
      tree[item.folderName] = {
        directory: mapToWebContainerTree(item.items || [])
      };
    } else {
      // It's a file, format the name and map the contents
      const baseName = item.filename || item.name || '';
      const ext = item.fileExtension ? (item.fileExtension.startsWith('.') ? item.fileExtension : `.${item.fileExtension}`) : '';
      const fullName = (baseName && ext && !baseName.endsWith(ext)) ? `${baseName}${ext}` : baseName;
      
      tree[fullName] = {
        file: {
          contents: item.content || ''
        }
      };
    }
  }
  return tree;
};