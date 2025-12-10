// // frontend/src/components/UploadPDF.tsx

import React, { useState, useRef } from "react";
import { processPDF } from "../lib/ocr";
import { postRecord } from "../api";

// Helper styles (Defined outside the component for better performance)
const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  marginRight: "10px",
  transition: "background-color 0.3s",
};

const progressBarContainerStyle = {
  height: '10px',
  backgroundColor: '#e9ecef',
  borderRadius: '5px',
  overflow: 'hidden',
  marginTop: '10px',
  width: '100%',
};

export default function UploadPDF() {
  const [status, setStatus] = useState("Ready to upload.");
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("Processing...");
    setProgress(0);
    setIsProcessing(true);

    try {
      const results = await processPDF(file, (p, page, total) => {
        setProgress(p);
        setStatus(`Processing Page ${page}/${total}... (${p}%)`);
      });

      setStatus(`Found ${results.length} records. Saving...`);

      for (const r of results) {
        await postRecord(r); 
      }
      
      setStatus("Upload & save successful. Reloading...");
      
      // Clear the file input value so the same file can be uploaded again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      setTimeout(()=> window.location.reload(), 700);

    } catch (err: any) {
      console.error(err);
      setStatus("Error: " + (err.message || "An unknown error occurred."));
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current && !isProcessing) {
      fileInputRef.current.click();
    }
  };

  return (
    <div style={{ padding: 20, border: "1px solid #ddd", borderRadius: "8px", marginBottom: "30px", backgroundColor: "#f9f9f9" }}>
      <h2>Upload Child PDF</h2>
      
      {/* Hidden file input, triggered by the styled button */}
      <input 
        ref={fileInputRef} 
        type="file" 
        accept="application/pdf" 
        onChange={handleFile} 
        style={{ display: "none" }}
        disabled={isProcessing}
      />
      
      <button 
        onClick={handleButtonClick} 
        style={{...buttonStyle, opacity: isProcessing ? 0.6 : 1}}
        disabled={isProcessing}
        title={isProcessing ? "Processing in progress" : "Click to select a PDF"}
      >
        {isProcessing ? "Processing..." : "Select PDF for OCR"}
      </button>

      <p style={{ marginTop: "15px", fontWeight: "bold", color: isProcessing ? '#007bff' : '#333' }}>
        {status}
      </p>
      
      {/* Progress Bar Visualization */}
      {isProcessing && progress > 0 && (
        <div style={progressBarContainerStyle}>
          <div 
            style={{
              height: '100%', 
              width: `${progress}%`, 
              backgroundColor: '#28a745', 
              borderRadius: '5px',
              transition: 'width 0.3s ease-in-out'
            }}
          />
        </div>
      )}
    </div>
  );
}