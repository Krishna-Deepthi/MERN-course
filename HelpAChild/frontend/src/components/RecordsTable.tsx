// import React, { useEffect, useState } from "react";
// import { getRecords } from "../api";

// export default function RecordsTable() {
//   const [rows, setRows] = useState<any[]>([]);
//   useEffect(() => {
//     (async () => {
//       setRows(await getRecords());
//     })();
//   }, []);
//   return (
//     <div style={{padding:20}}>
//       <h2>Existing Records</h2>
//       <table border={1} cellPadding={8} style={{borderCollapse:"collapse", width:"100%"}}>
//         <thead>
//           <tr>
//             <th>Name</th><th>Child#</th><th>Gender</th><th>DOB</th><th>Class</th><th>Centre</th><th>Year</th><th>Background</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((r, i) => (
//             <tr key={i}>
//               <td>{r.name}</td>
//               <td>{r.childNumber}</td>
//               <td>{r.gender}</td>
//               <td>{r.dateOfBirth}</td>
//               <td>{r.classOfStudy}</td>
//               <td>{r.center}</td>
//               <td>{r.yearOfAdmission}</td>
//               <td style={{maxWidth:400, whiteSpace:"normal"}}>{r.background}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// frontend/src/components/RecordsTable.tsx

// frontend/src/components/RecordsTable.tsx

import React, { useEffect, useState } from "react";
import { getRecords } from "../api";
// Assuming ChildData interface is defined and exported from your ocr file
import { ChildData } from "../lib/ocr"; 

// Define the styles once for a clean look
const tableStyle: React.CSSProperties = {
  borderCollapse: "separate",
  borderSpacing: 0,
  width: "100%",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  overflow: "hidden", 
};

const thStyle: React.CSSProperties = {
  backgroundColor: "#007bff", // Blue header
  color: "white",
  padding: "12px 15px",
  textAlign: "left",
  fontWeight: "600",
};

const tdStyle: React.CSSProperties = {
  padding: "10px 15px",
  borderBottom: "1px solid #eee",
  backgroundColor: "white",
};

// Custom row styling for alternating colors
const getRowStyle = (isEven: boolean): React.CSSProperties => ({
  backgroundColor: isEven ? '#f8f9fa' : 'white',
  transition: 'background-color 0.2s',
  cursor: 'default',
});


export default function RecordsTable() {
  const [rows, setRows] = useState<ChildData[]>([]); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      // Fetches records and casts them to the ChildData array
      setRows(await getRecords() as ChildData[]); 
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <div style={{padding:20}}>Loading existing records...</div>;
  }
  
  if (rows.length === 0) {
      return <div style={{padding:20}}>No existing records found. Upload a PDF to start!</div>;
  }

  return (
    <div style={{padding:20}}>
      <h2>Existing Records ({rows.length})</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            {/* Apply rounded corners to the first and last header cells */}
            <th style={{...thStyle, borderTopLeftRadius: '8px'}}>Name</th>
            <th style={thStyle}>Child#</th>
            <th style={thStyle}>Gender</th>
            <th style={thStyle}>DOB</th>
            <th style={thStyle}>Class</th>
            <th style={thStyle}>Centre</th>
            <th style={thStyle}>Year</th>
            <th style={{...thStyle, borderTopRightRadius: '8px'}}>Background</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr 
              key={i} 
              style={getRowStyle(i % 2 === 0)}
              // Simple inline hover effect for interactivity
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
              // FIX APPLIED: Asserting the returned backgroundColor property as 'string'
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = getRowStyle(i % 2 === 0).backgroundColor as string}
            >
              <td style={tdStyle}>{r.name}</td>
              <td style={tdStyle}>{r.childNumber}</td>
              <td style={tdStyle}>{r.gender}</td>
              <td style={tdStyle}>{r.dateOfBirth}</td>
              <td style={tdStyle}>{r.classOfStudy}</td>
              <td style={tdStyle}>{r.center}</td>
              <td style={tdStyle}>{r.yearOfAdmission}</td>
              <td style={{...tdStyle, maxWidth:400, whiteSpace:"normal", fontSize:"0.9em"}}>{r.background}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}