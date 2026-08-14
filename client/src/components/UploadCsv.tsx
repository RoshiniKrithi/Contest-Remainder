import React, { useState } from "react";
import "./UploadCsv.css";

/**
 * UploadCsv – A polished component for uploading CSV files.
 * It posts the selected file to the `/api/bulk-import-handles` endpoint.
 * Shows clear success and error messages.
 */
export default function UploadCsv() {
  const [status, setStatus] = useState<{ type: "idle" | "uploading" | "success" | "error"; message?: string }>({
    type: "idle",
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus({ type: "uploading" });
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/bulk-import-handles", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setStatus({ type: "success", message: data.message || "CSV uploaded successfully!" });
      } else {
        setStatus({ type: "error", message: data.error || "Upload failed." });
      }
    } catch (err: any) {
      setStatus({ type: "error", message: err.message || "Network error." });
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Import Student Handles (CSV)</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleUpload}
        className="file-input"
        disabled={status.type === "uploading"}
      />
      {status.type === "uploading" && <p className="status-message status-uploading">Uploading…</p>}
      {status.type === "success" && <p className="status-message status-success">{status.message}</p>}
      {status.type === "error" && <p className="status-message status-error">{status.message}</p>}
    </div>
  );
}
