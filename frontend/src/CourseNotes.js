import React, { useEffect, useState } from "react";

// Local storage helpers
const storageKey = (code) => `course_notes_${code}`;

function readNotes(code) {
  try {
    const raw = localStorage.getItem(storageKey(code));
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to read notes:", e);
    return [];
  }
}

function saveNotes(code, notes) {
  try {
    localStorage.setItem(storageKey(code), JSON.stringify(notes));
  } catch (e) {
    console.error("Failed to save notes:", e);
  }
}

const CourseNotes = ({ course, canUpload = false }) => {
  const [notes, setNotes] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (course?.code) {
      setNotes(readNotes(course.code));
    }
  }, [course?.code]);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !course?.code) return;

    setUploading(true);
    try {
      // Convert file to data URL for preview/download
      const reader = new FileReader();
      const dataUrl = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const newNote = {
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        dataUrl,
      };

      const updated = [newNote, ...readNotes(course.code)];
      saveNotes(course.code, updated);
      setNotes(updated);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload note. Try again.");
    } finally {
      setUploading(false);
      e.target.value = ""; // reset input
    }
  };

  const isPreviewable = (type) =>
    type?.startsWith("image/") || type === "application/pdf";

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ color: "#b07c6c", marginBottom: 10 }}>
        {course?.name} ({course?.code})
      </h2>
      <p style={{ marginTop: 0, color: "#555", marginBottom: 20 }}>
        Notes uploaded by teacher
      </p>

      {canUpload && (
        <div
          style={{
            background: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: 10,
            padding: 16,
            marginBottom: 20,
          }}
        >
          <h3 style={{ marginTop: 0, color: "#333" }}>Upload note</h3>
          <input
            type="file"
            accept=".pdf,.doc,.docx,image/*"
            onChange={handleFileSelect}
            disabled={uploading}
          />
          {uploading && <p>Uploading...</p>}
        </div>
      )}

      {notes.length === 0 ? (
        <div
          style={{
            background: "#fff",
            border: "1px dashed #d9c2b7",
            borderRadius: 10,
            padding: 24,
            color: "#8b6f47",
          }}
        >
          No notes yet.
        </div>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {notes.map((n, idx) => (
            <div
              key={idx}
              style={{
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: 10,
                padding: 16,
                display: "flex",
                gap: 16,
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "#333" }}>{n.name}</div>
                <div style={{ fontSize: 12, color: "#777" }}>
                  {(n.size / 1024).toFixed(1)} KB · {new Date(n.uploadedAt).toLocaleString()}
                </div>
                <div style={{ marginTop: 8 }}>
                  <a href={n.dataUrl} download={n.name} style={{ marginRight: 12 }}>
                    Download
                  </a>
                  {isPreviewable(n.type) && (
                    <a href={n.dataUrl} target="_blank" rel="noreferrer">
                      Open
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseNotes;
