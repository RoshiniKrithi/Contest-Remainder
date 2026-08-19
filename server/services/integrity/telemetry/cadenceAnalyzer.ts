export interface TelemetryMetrics {
  ikiAverageMs: number;
  ikiEntropy: number;
  pasteRatio: number;
  backspaceCount: number;
  deleteCount: number;
  selectionCount: number;
  astVelocityMax: number;
}

/**
 * Calculates Shannon Entropy of Inter-Keystroke Intervals (IKIs)
 * IKI is the time elapsed between subsequent keystroke events in milliseconds
 */
export function calculateIkiEntropy(ikis: number[]): number {
  if (ikis.length === 0) return 0;

  // Group IKIs into binned frequencies (e.g. 50ms wide bins up to 1000ms)
  const binSize = 50;
  const frequencies = new Map<number, number>();

  for (const iki of ikis) {
    const bin = Math.min(Math.floor(iki / binSize) * binSize, 2000); // cap at 2000ms
    frequencies.set(bin, (frequencies.get(bin) || 0) + 1);
  }

  let entropy = 0;
  const total = ikis.length;

  for (const [_, count] of frequencies.entries()) {
    const p = count / total;
    entropy -= p * Math.log2(p);
  }

  return parseFloat(entropy.toFixed(3));
}

/**
 * Analyzes telemetry event histories to extract keystroke cadence and pasting behaviors
 */
export function analyzeTelemetryCadence(
  events: Array<{ eventType: string; timestamp: Date | string; payload?: any }>,
  snapshots: Array<{ timestamp: Date | string; astNodeCount?: number; totalCharCount?: number }>
): TelemetryMetrics {
  // 1. Keystroke Intervals
  const keystrokeTimestamps: number[] = [];
  let backspaceCount = 0;
  let deleteCount = 0;
  let selectionCount = 0;
  let pasteCount = 0;
  let pastedCharCount = 0;

  for (const e of events) {
    const time = new Date(e.timestamp).getTime();
    if (e.eventType === "KEYSTROKE") {
      keystrokeTimestamps.push(time);
    } else if (e.eventType === "BACKSPACE") {
      backspaceCount++;
    } else if (e.eventType === "DELETE") {
      deleteCount++;
    } else if (e.eventType === "SELECTION") {
      selectionCount++;
    } else if (e.eventType === "PASTE") {
      pasteCount++;
      const added = parseInt(e.payload?.insertedLength, 10) || 0;
      pastedCharCount += added;
    }
  }

  // Calculate IKIs
  const ikis: number[] = [];
  for (let i = 1; i < keystrokeTimestamps.length; i++) {
    const diff = keystrokeTimestamps[i] - keystrokeTimestamps[i - 1];
    if (diff >= 0 && diff < 5000) { // filter out inactivity gaps > 5s
      ikis.push(diff);
    }
  }

  const ikiSum = ikis.reduce((a, b) => a + b, 0);
  const ikiAverageMs = ikis.length > 0 ? Math.round(ikiSum / ikis.length) : 0;
  const ikiEntropy = calculateIkiEntropy(ikis);

  // 2. Paste Ratio
  // Use final snapshot or code size metrics
  const lastSnapshot = snapshots.length > 0 ? snapshots[snapshots.length - 1] : null;
  const totalCharCount = lastSnapshot?.totalCharCount || 1;
  const pasteRatio = Math.min(100, Math.round((pastedCharCount / Math.max(totalCharCount, 1)) * 100));

  // 3. AST Velocity
  // Track consecutive snapshots to identify node count spikes over time
  let astVelocityMax = 0;
  snapshots.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  
  for (let i = 1; i < snapshots.length; i++) {
    const timeDiff = (new Date(snapshots[i].timestamp).getTime() - new Date(snapshots[i-1].timestamp).getTime()) / 1000;
    const nodeDiff = (snapshots[i].astNodeCount || 0) - (snapshots[i-1].astNodeCount || 0);
    
    if (timeDiff > 0 && nodeDiff > 0) {
      const velocity = Math.round(nodeDiff / timeDiff); // nodes per second
      if (velocity > astVelocityMax) {
        astVelocityMax = velocity;
      }
    }
  }

  return {
    ikiAverageMs,
    ikiEntropy,
    pasteRatio,
    backspaceCount,
    deleteCount,
    selectionCount,
    astVelocityMax,
  };
}
