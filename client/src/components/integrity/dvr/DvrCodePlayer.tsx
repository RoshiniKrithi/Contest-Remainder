import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Square, SkipForward, SkipBack, Terminal, Clock, ShieldAlert } from "lucide-react";

interface DvrEvent {
  id: string;
  eventType: string;
  timestamp: string;
  cursorOffset: number;
  payload: any;
}

interface DvrSnapshot {
  id: string;
  timestamp: string;
  totalCharCount: number;
  astNodeCount: number;
  cyclomaticComplexity: number;
}

interface DvrCodePlayerProps {
  events: DvrEvent[];
  snapshots: DvrSnapshot[];
  finalCode: string;
}

export function DvrCodePlayer({ events = [], snapshots = [], finalCode }: DvrCodePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playSpeed, setPlaySpeed] = useState(1); // 1x, 2x, 5x
  const [reconstructedCode, setReconstructedCode] = useState("");
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reconstruct code up to the current event index
  const reconstructCode = (endIndex: number) => {
    if (events.length === 0) {
      setReconstructedCode(finalCode);
      return;
    }

    // Keyframe anchoring: find the closest snapshot preceding the target index
    const targetEvent = events[endIndex];
    if (!targetEvent) return;

    const targetTime = new Date(targetEvent.timestamp).getTime();

    // Reconstruct simply using incremental character insertions/deletions on an array
    let chars: string[] = [];

    // Apply incremental events from start
    for (let i = 0; i <= endIndex; i++) {
      const e = events[i];
      const offset = Math.min(chars.length, e.cursorOffset);

      if (e.eventType === "KEYSTROKE") {
        const char = e.payload?.keyCode === 13 ? "\n" : (e.payload?.char || "•");
        chars.splice(offset, 0, char);
      } else if (e.eventType === "BACKSPACE") {
        if (offset > 0) {
          chars.splice(offset - 1, 1);
        }
      } else if (e.eventType === "DELETE") {
        chars.splice(offset, 1);
      } else if (e.eventType === "PASTE") {
        const pasteLen = parseInt(e.payload?.insertedLength, 10) || 0;
        const snippet = e.payload?.textSample || "/* [Pasted Code Block] */";
        chars.splice(offset, 0, snippet);
      }
    }

    setReconstructedCode(chars.join(""));
  };

  useEffect(() => {
    reconstructCode(currentIndex);
  }, [currentIndex, events, finalCode]);

  // Handle play loop ticker
  useEffect(() => {
    if (isPlaying) {
      const interval = Math.max(50, 300 / playSpeed);
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= events.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, interval);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playSpeed, events]);

  const handlePlayToggle = () => setIsPlaying(!isPlaying);
  const handleStop = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  const handleScrubChange = (values: number[]) => {
    setIsPlaying(false);
    setCurrentIndex(values[0]);
  };

  const getEventBadge = (type: string) => {
    if (type === "PASTE") return <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30 text-[9px]">PASTE</Badge>;
    if (type === "BLUR") return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[9px]">BLUR (Tab Switch)</Badge>;
    if (type === "FOCUS") return <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-[9px]">FOCUS</Badge>;
    return <Badge variant="outline" className="text-[9px] border-slate-800 text-slate-400">{type}</Badge>;
  };

  const currentEvent = events[currentIndex];

  return (
    <Card className="bg-[#0b0f19] border-white/5 text-white">
      <CardHeader className="py-4 border-b border-white/5 flex flex-row items-center justify-between">
        <CardTitle className="text-xs font-black uppercase text-slate-400 flex items-center gap-1.5">
          <Terminal className="h-4 w-4 text-cyan-400" />
          DVR Keystroke Playback
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 font-mono text-[10px]">
            Event {currentIndex + 1} / {Math.max(1, events.length)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Reconstructed Code Display Console */}
        <div className="relative border border-white/5 rounded-lg overflow-hidden h-72 bg-slate-950/60 font-mono text-xs p-4 overflow-y-auto leading-relaxed">
          <pre className="text-cyan-300 whitespace-pre-wrap select-none">{reconstructedCode || "// Starting DVR session playback..."}</pre>
        </div>

        {/* Current event metadata */}
        {currentEvent && (
          <div className="flex items-center gap-3 p-3 bg-slate-900 border border-white/5 rounded-lg text-xs justify-between">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-cyan-400" /> Timestamp:</span>
              <span className="font-bold font-mono text-slate-300">{new Date(currentEvent.timestamp).toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Event Class:</span>
              {getEventBadge(currentEvent.eventType)}
            </div>
          </div>
        )}

        {/* DVR Controls and Scrubber slider */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Slider
              min={0}
              max={Math.max(0, events.length - 1)}
              step={1}
              value={[currentIndex]}
              onValueChange={handleScrubChange}
              className="flex-grow cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5">
              <Button variant="ghost" size="icon" onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} className="h-8 w-8 text-slate-400 hover:text-white border border-white/5">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button size="icon" onClick={handlePlayToggle} className="h-8 w-8 bg-cyan-500 hover:bg-cyan-400 text-slate-950">
                {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleStop} className="h-8 w-8 text-slate-400 hover:text-white border border-white/5">
                <Square className="h-4 w-4 fill-current" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setCurrentIndex(Math.min(events.length - 1, currentIndex + 1))} className="h-8 w-8 text-slate-400 hover:text-white border border-white/5">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider">Playback Speed:</span>
              <div className="flex rounded border border-white/5 overflow-hidden">
                {([1, 2, 5] as const).map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaySpeed(speed)}
                    className={`px-2.5 py-1 text-[10px] font-bold ${playSpeed === speed ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
