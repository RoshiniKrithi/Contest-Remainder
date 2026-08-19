import { useEffect, useRef } from "react";
import { useIntegritySession } from "./CodeIntegrityProvider";

interface MonacoTelemetryTrackerProps {
  editor: any; // Monaco Editor Instance
  monaco: any; // Monaco Global Object
  code: string;
  language: string;
}

export function MonacoTelemetryTracker({ editor, monaco, code, language }: MonacoTelemetryTrackerProps) {
  const { recordEvent, syncCodeSnapshot } = useIntegritySession();
  const lastSnapshotVal = useRef(code);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!editor || !monaco) return;

    // 1. Keystroke & Delete Tracking
    const keyDisposable = editor.onKeyDown((e: any) => {
      const offset = editor.getPosition() ? editor.getModel().getOffsetAt(editor.getPosition()) : 0;
      
      if (e.keyCode === monaco.KeyCode.Backspace) {
        recordEvent("BACKSPACE", offset);
      } else if (e.keyCode === monaco.KeyCode.Delete) {
        recordEvent("DELETE", offset);
      } else {
        recordEvent("KEYSTROKE", offset, { keyCode: e.keyCode });
      }
    });

    // 2. Paste & Text Change Tracking
    const contentDisposable = editor.onDidChangeModelContent((e: any) => {
      const offset = editor.getPosition() ? editor.getModel().getOffsetAt(editor.getPosition()) : 0;
      
      for (const change of e.changes) {
        // Detect pasting or large insertion blocks
        if (change.text.length > 5) {
          recordEvent("PASTE", offset, {
            insertedLength: change.text.length,
            textSample: change.text.substring(0, 50),
          });
        }
      }

      // Debounce code snapshot pushes (e.g. upload snapshot 2s after typing stops)
      const currentVal = editor.getValue();
      if (currentVal !== lastSnapshotVal.current) {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
          syncCodeSnapshot(currentVal, language);
          lastSnapshotVal.current = currentVal;
        }, 2000);
      }
    });

    // 3. Editor Focus / Blur Tracking
    const focusDisposable = editor.onDidFocusEditorWidget(() => {
      const offset = editor.getPosition() ? editor.getModel().getOffsetAt(editor.getPosition()) : 0;
      recordEvent("FOCUS", offset);
    });

    const blurDisposable = editor.onDidBlurEditorWidget(() => {
      const offset = editor.getPosition() ? editor.getModel().getOffsetAt(editor.getPosition()) : 0;
      recordEvent("BLUR", offset);
    });

    // 4. Cursor Selection Tracking
    const selectionDisposable = editor.onDidChangeCursorSelection((e: any) => {
      const offset = editor.getPosition() ? editor.getModel().getOffsetAt(editor.getPosition()) : 0;
      const start = editor.getModel().getOffsetAt(e.selection.getStartPosition());
      const end = editor.getModel().getOffsetAt(e.selection.getEndPosition());
      if (start !== end) {
        recordEvent("SELECTION", offset, { selectionLength: Math.abs(end - start) });
      }
    });

    return () => {
      keyDisposable.dispose();
      contentDisposable.dispose();
      focusDisposable.dispose();
      blurDisposable.dispose();
      selectionDisposable.dispose();
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [editor, monaco, language]);

  return null;
}
