export interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  language?: string;
  children?: FileNode[];
  metadata?: {
    originalContent?: string;
    fullFilename?: string;
    title?: string;
    [key: string]: any;
  };
}

export interface FileExplorerProps {
  files: FileNode[]
  activeFileId: string | null
  onFileSelect: (file: FileNode) => void
  onCreateFile?: (name: string, language: "qz") => void
}