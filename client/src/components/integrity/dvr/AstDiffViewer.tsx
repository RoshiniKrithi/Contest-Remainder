import { DiffEditor } from "@monaco-editor/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";

interface AstDiffViewerProps {
  currentCode: string;
  matchedCode: string;
  matchedUser: string;
  similarityScore: number;
}

export function AstDiffViewer({
  currentCode,
  matchedCode,
  matchedUser,
  similarityScore,
}: AstDiffViewerProps) {
  return (
    <Card className="bg-[#0b0f19] border-white/5 text-white flex flex-col h-[520px]">
      <CardHeader className="py-4 border-b border-white/5 shrink-0 flex flex-row items-center justify-between">
        <CardTitle className="text-xs font-black uppercase text-slate-400 flex items-center gap-1.5">
          <Code className="h-4 w-4 text-cyan-400" />
          AST Structural Code Diff
        </CardTitle>
        <div className="flex items-center gap-3">
          <Badge className="bg-slate-900 border border-slate-700 text-slate-300 text-[10px]">
            Original vs. {matchedUser || "Prior Submission"}
          </Badge>
          <Badge className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-black">
            {similarityScore}% Match
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 min-h-0 relative">
        <DiffEditor
          height="100%"
          original={matchedCode || "// No matched prior code available."}
          modified={currentCode || "// No code submitted."}
          language="cpp" // fallback, Monaco detects formatting
          theme="vs-dark"
          options={{
            readOnly: true,
            originalEditable: false,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            renderSideBySide: true,
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            padding: { top: 12, bottom: 12 },
          }}
        />
      </CardContent>
    </Card>
  );
}
