import {useEffect, useState} from "react"
import type {CodeResponse, FileNode} from "../../interfaces";
import FileExplorer from "../file-explorer/file-explorer.tsx";
import {Check, Copy, Play, RotateCcw} from "lucide-react"
import {Card} from "../ui/card.tsx";
import {Button} from "../ui/button.tsx";
import {Editor, useMonaco} from "@monaco-editor/react";
import examplesData from '../../assets/examples.json';
import {registerQuetzalLanguage} from "../../lib/register-lang.ts";


const transformExamplesToFileNodes = (data: typeof examplesData): FileNode[] => {
  return data.examples.map((category, categoryIndex) => {
    const categoryId = `category-${categoryIndex}`;

    const fileChildren: FileNode[] = category.content.map((example) => {
      const fileId = `${categoryId}-file-${example.id}`;
      const fileName = example.filename.replace('.qz', '');

      return {
        id: fileId,
        name: fileName,
        type: "file",
        language: "qz",
        metadata: {
          originalContent: example.content,
          fullFilename: example.filename,
          title: example.title
        }
      };
    });

    return {
      id: categoryId,
      name: category.title,
      type: "folder",
      children: fileChildren
    };
  });
};

const createFileContentsMap = (data: typeof examplesData): Record<string, string> => {
  const contents: Record<string, string> = {};

  data.examples.forEach((category, categoryIndex) => {
    const categoryId = `category-${categoryIndex}`;

    category.content.forEach((example) => {
      const fileId = `${categoryId}-file-${example.id}`;
      contents[fileId] = example.content;
    });
  });

  return contents;
};

export default function CodePlayground() {
  const [files, setFiles] = useState<FileNode[]>([]);
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFileExplorer, setShowFileExplorer] = useState(false);

  const handeInit = () => {
    const fileNodes = transformExamplesToFileNodes(examplesData);
    const contentsMap = createFileContentsMap(examplesData);

    setFiles(fileNodes);
    setFileContents(contentsMap);

    if (fileNodes.length > 0 && fileNodes[0].children && fileNodes[0].children.length > 0) {
      setActiveFileId(fileNodes[0].children[0].id);
    }
  }

  const monaco = useMonaco();

  useEffect(() => {
    handeInit();
  }, []);

  useEffect(() => {
    if (!monaco) return
    registerQuetzalLanguage(monaco);
  }, [monaco]);

  const activeFile = files.find((f) => f.id === activeFileId) ||
    files.flatMap(f => f.children || []).find(f => f.id === activeFileId);

  const currentCode = activeFileId ? fileContents[activeFileId] || "" : "";

  const handleFileSelect = (file: FileNode) => {
    if (file.type === "file") {
      setActiveFileId(file.id);
      setShowFileExplorer(false); // Cerrar explorer en móvil después de seleccionar
    }
  }

  const handleRun = async () => {
    if (!activeFile || !activeFileId) return

    setIsRunning(true)
    setOutput("Ejecutando...")

    try {
      const res = await fetch("/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: currentCode })
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data: CodeResponse = await res.json();
      setOutput(data.stdout || data.stderr || "⚠️ Sin salida...");
    } catch (error) {
      setOutput(`❌ Error: ${error instanceof Error ? error.message : "Error desconocido"}`)
    } finally {
      setIsRunning(false)
    }
  }

  const handleClear = () => {
    if (activeFileId) {
      handeInit();
    }
    setOutput("");
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getLanguageLabel = () => {
    if (!activeFile) return ""
    return activeFile.language === "qz" && "quetzal";
  }

  const handleCodeChange = (value: string) => {
    if (activeFileId) {
      setFileContents({
        ...fileContents,
        [activeFileId]: value,
      })
    }
  }

  const getFullFilename = () => {
    if (!activeFile) return "";
    if (activeFile.metadata?.fullFilename) {
      return activeFile.metadata.fullFilename;
    }
    return `${activeFile.name}.${activeFile.language}`;
  };

  return (
    <div className="flex flex-col gap-2 h-full min-h-0">
      {/* Botón para mostrar/ocultar file explorer en móviles */}
      <div className="flex sm:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFileExplorer(!showFileExplorer)}
          className="w-full text-xs bg-[#161b22] border-[#30363d] text-[#e6edf3]"
        >
          {showFileExplorer ? "📂 Ocultar Explorador" : "📂 Mostrar Explorador"}
        </Button>
      </div>

      {/* Layout principal */}
      <div className="flex flex-col sm:flex-row gap-2 flex-1 min-h-0">
        {/* File Explorer - Oculto en móviles por defecto */}
        <div className={`${showFileExplorer ? 'flex' : 'hidden'} sm:flex w-full sm:w-48 flex-shrink-0`}>
          <Card className="h-full bg-[#010409] border-[#30363d] overflow-hidden flex flex-col w-full">
            <div className="flex-1 min-h-0 overflow-auto">
              <FileExplorer
                files={files}
                activeFileId={activeFileId}
                onFileSelect={handleFileSelect}
              />
            </div>
          </Card>
        </div>

        {/* Editor - Espacio principal */}
        <Card className="bg-[#0d1117] border-[#30363d] overflow-hidden flex flex-col flex-1 min-h-0">
          {/* Header del editor compacto */}
          <div className="flex items-center justify-between border-b border-[#30363d] px-2 py-1 bg-[#161b22] flex-shrink-0">
            <div className="flex items-center gap-1 min-w-0 flex-1">
              <span className="font-mono text-xs text-[#7d8590] truncate">{getLanguageLabel()}</span>
              {activeFile && (
                <span className="font-mono text-xs text-foreground truncate ml-1">
                  {getFullFilename()}
                </span>
              )}
            </div>
            <div className="flex gap-1 flex-shrink-0 ml-1">
              <Button size="sm" variant="ghost" onClick={handleCopy} className="h-5 w-5 p-0 hover:bg-[#21262d]">
                {copied ? (
                  <Check className="h-2.5 w-2.5 text-[#56d364]"/>
                ) : (
                  <Copy className="h-2.5 w-2.5 text-[#7d8590]"/>
                )}
              </Button>
              <Button size="sm" variant="ghost" onClick={handleClear} className="h-5 w-5 p-0 hover:bg-[#21262d]">
                <RotateCcw className="h-2.5 w-2.5 text-[#7d8590]"/>
              </Button>
              <Button
                onClick={handleRun}
                disabled={isRunning || !activeFile}
                className="bg-[#238636] text-white hover:bg-[#2ea043] h-5 text-[10px] px-2"
              >
                <Play className="h-2.5 w-2.5 mr-1"/>
                Run
              </Button>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              language="quetzal"
              theme="hc-black"
              value={currentCode}
              onChange={(e) => e !== undefined && handleCodeChange(e)}
              options={{
                minimap: {enabled: false},
                fontSize: 12,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 4, bottom: 4 },
                wordWrap: "on"
              }}
            />
          </div>
        </Card>
      </div>

      {/* Consola de resultados compacta */}
      <Card className="bg-[#0d1117] border-[#30363d] overflow-hidden flex flex-col h-24 flex-shrink-0">
        <div className="border-b border-[#30363d] px-2 py-1 bg-[#161b22]">
          <h3 className="font-mono text-xs font-semibold text-foreground">Resultado</h3>
        </div>
        <div className="flex-1 p-2 overflow-auto">
          <pre className="font-mono text-xs text-[#e6edf3] whitespace-pre-wrap leading-tight">
            {output || "Ejecuta tu código para ver el resultado... 🤓"}
          </pre>
        </div>
      </Card>
    </div>
  )
}