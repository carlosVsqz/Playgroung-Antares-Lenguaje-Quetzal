import type {FileExplorerProps, FileNode} from "../../interfaces";
import {useState} from "react";
import {ChevronDown, ChevronRight, FileCode, Info} from "lucide-react"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../ui/tooltip.tsx";

function FileTreeItem({
                        node,
                        level = 0,
                        activeFileId,
                        onFileSelect,
                      }: {
  node: FileNode
  level?: number
  activeFileId: string | null
  onFileSelect: (file: FileNode) => void
}) {
  const [isExpanded, setIsExpanded] = useState(true)
  const isActive = node.id === activeFileId

  const handleClick = () => {
    if (node.type === "folder") {
      setIsExpanded(!isExpanded)
    } else {
      onFileSelect(node)
    }
  }

  const getFileIcon = () => {
    if (node.type === "folder") {
      return isExpanded ? (
        <ChevronDown className="h-4 w-4 text-muted-foreground"/>
      ) : (
        <ChevronRight className="h-4 w-4 text-muted-foreground"/>
      )
    }
    return <FileCode className="h-4 w-4 text-[#58a6ff]"/>
  }

  const getFileExtension = () => {
    if (node.language === "qz") return ".qz"
    return ""
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full flex items-center gap-2 px-2 py-1 text-sm hover:bg-[#21262d] rounded transition-colors ${
          isActive ? "bg-[#21262d] text-foreground" : "text-muted-foreground"
        }`}
        style={{paddingLeft: `${level * 12 + 8}px`}}
      >
        {getFileIcon()}
        <span className="truncate">
          {node.name}
          {node.type === "file" && getFileExtension()}
        </span>
      </button>
      {node.type === "folder" && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeItem
              key={child.id}
              node={child}
              level={level + 1}
              activeFileId={activeFileId}
              onFileSelect={onFileSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function FileExplorer({files, activeFileId, onFileSelect}: FileExplorerProps) {
  return (
    <div className="h-full flex flex-col bg-[#010409] border-r border-border">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <span className="text-sm font-semibold text-foreground">Explorador</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-[#21262d] transition-colors">
                <Info className="h-4 w-4 text-[#7d8590]"/>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-[#161b22] border-[#30363d] text-[#e6edf3]">
              <p className="text-sm">Dentro del explorador encontraras ejemplos que puedes ejecutar 💻✨</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex-1 overflow-auto py-2">
        {files.map((file) => (
          <FileTreeItem key={file.id} node={file} activeFileId={activeFileId} onFileSelect={onFileSelect}/>
        ))}
      </div>
    </div>
  )
}
