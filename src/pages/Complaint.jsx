
import React, { useEffect, useState } from "react";
import { apiRequest } from "../api/apiRequest"; 

const Complaint = () => {

  const [data, setData] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedTechs, setSelectedTechs] = useState({});


  const loadData = async () => {

   
    const complaints = await apiRequest("/complaint");
    console.log("COMPLAINTS :", complaints);
    if (Array.isArray(complaints)) setData(complaints);

    
    const techs = await apiRequest("/technician");
    console.log("TECHNICIANS :", techs);
    if (Array.isArray(techs)) setTechnicians(techs);
  };

  useEffect(() => {
    loadData();
  }, []);

  
  const handleAssign = async (complaintId) => {

    const techId = selectedTechs[complaintId];
    if (!techId) return alert("Select Technician!");

    const selectedTech = technicians.find((t) => t._id === techId);

    const result = await apiRequest(`/assign/${complaintId}`, "PUT", {
      technicianId: techId,
      technicianName: selectedTech.name,
    });

    console.log("ASSIGN RESULT :", result);

    if (result.status !== false) {
      alert("Assigned Successfully");
      loadData();
    } else {
      alert("Assign Failed: " + result.message);
    }
  };

  return (
    <div className="main">

      <div className="main-title">Complaints</div>
      <div className="main-sub">All service requests</div>

      <div className="complaint-grid">
        {data.map((item) => (
          <div className="complaint-card" key={item._id}>

            {/* HEADER */}
            <div className="complaint-card-header">
              <div className="complaint-icon">
                <i className="ti ti-alert-circle"></i>
              </div>

              <div style={{ flex: 1 }}>
                <div className="complaint-problem">{item.problem}</div>
                <div className="complaint-device">
                  <i className="ti ti-device-mobile"></i> {item.device}
                </div>
              </div>

              <span className={`badge ${
                item.technicianName && item.technicianName !== "None"
                  ? "badge-prog"
                  : "badge-open"
              }`}>
                {item.technicianName && item.technicianName !== "None"
                  ? "Assigned"
                  : "Open"}
              </span>
            </div>

            {/* BODY */}
            <div className="complaint-body">
              {item.image && (
                <img
                  src={`https://serviceapp-1-mqaj.onrender.com/uploads/${item.image}`} 
                  alt="complaint"
                  className="complaint-img"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              )}

              <div className="complaint-info-grid">
                <div className="complaint-info-item">
                  <i className="ti ti-user"></i>
                  <span>{item.name}</span>
                </div>
                <div className="complaint-info-item">
                  <i className="ti ti-phone"></i>
                  <span>{item.phone}</span>
                </div>
                <div className="complaint-info-item">
                  <i className="ti ti-map-pin"></i>
                  <span>{item.location}</span>
                </div>
                <div className="complaint-info-item">
                  <i className="ti ti-tool"></i>
                  <span>
                    Tech: <b style={{ color: "aqua" }}>
                      {item.technicianName || "Not assigned"}
                    </b>
                  </span>
                </div>
              </div>
            </div>

            {/* ASSIGN SECTION */}
            <div className="complaint-assign">
              <select
                className="assign-select"
                value={selectedTechs[item._id] || ""}
                onChange={(e) =>
                  setSelectedTechs({ ...selectedTechs, [item._id]: e.target.value })
                }
              >
                <option value="">Select Technician</option>
                {technicians.map((tech) => (
                  <option key={tech._id} value={tech._id}>
                    {tech.name}
                  </option>
                ))}
              </select>

              <button className="assign-btn" onClick={() => handleAssign(item._id)}>
                <i className="ti ti-check"></i> Assign
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Complaint;


































// import React, { useEffect, useState } from "react";

// const Complaint = () => {

//   const [data, setData] = useState([]);
//   const [technicians, setTechnicians] = useState([]);
//   const [selectedTechs, setSelectedTechs] = useState({});

//   // LOAD COMPLAINTS + TECHNICIANS
//   const loadData = () => {

//     // COMPLAINTS
//     fetch("http://localhost:7000/complaint")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("COMPLAINTS :", data);
//         setData(data);
//       })
//       .catch((err) => console.log(err));

//     // TECHNICIANS
//     fetch("http://localhost:7000/technician")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("TECHNICIANS :", data);
//         setTechnicians(data);
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // ASSIGN TECHNICIAN
//   const handleAssign = async (complaintId) => {

//     const techId = selectedTechs[complaintId];

//     if (!techId) {
//       return alert("Select Technician!");
//     }

//     const selectedTech = technicians.find(
//       (t) => t._id === techId
//     );

//     try {

//       const res = await fetch(
//         `http://localhost:7000/assign/${complaintId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             technicianId: techId,
//             technicianName: selectedTech.name,
//           }),
//         }
//       );

//       const result = await res.json();

//       console.log("ASSIGN RESULT :", result);

//       alert("Assigned Successfully");

//       loadData();

//     } catch (err) {

//       console.log(err);

//     }

//   };

//   return (
//     <div className="main">

//       <div className="main-title">
//         Complaints
//       </div>

//       <div className="main-sub">
//         All service requests
//       </div>

//       <div className="complaint-grid">

//         {data.map((item) => (

//           <div
//             className="complaint-card"
//             key={item._id}
//           >

//             {/* HEADER */}
//             <div className="complaint-card-header">

//               <div className="complaint-icon">
//                 <i className="ti ti-alert-circle"></i>
//               </div>

//               <div style={{ flex: 1 }}>

//                 <div className="complaint-problem">
//                   {item.problem}
//                 </div>

//                 <div className="complaint-device">
//                   <i className="ti ti-device-mobile"></i>
//                   {" "}
//                   {item.device}
//                 </div>

//               </div>

//               <span
//                 className={`badge ${
//                   item.technicianName &&
//                   item.technicianName !== "None"
//                     ? "badge-prog"
//                     : "badge-open"
//                 }`}
//               >
//                 {item.technicianName &&
//                 item.technicianName !== "None"
//                   ? "Assigned"
//                   : "Open"}
//               </span>

//             </div>

//             {/* BODY */}
//             <div className="complaint-body">

//               {item.image && (
//                 <img
//                   src={item.image}
//                   alt="complaint"
//                   className="complaint-img"
//                 />
//               )}

//               <div className="complaint-info-grid">

//                 <div className="complaint-info-item">
//                   <i className="ti ti-user"></i>
//                   <span>{item.name}</span>
//                 </div>

//                 <div className="complaint-info-item">
//                   <i className="ti ti-phone"></i>
//                   <span>{item.phone}</span>
//                 </div>

//                 <div className="complaint-info-item">
//                   <i className="ti ti-map-pin"></i>
//                   <span>{item.location}</span>
//                 </div>

//                 <div className="complaint-info-item">
//                   <i className="ti ti-tool"></i>

//                   <span>
//                     Tech:
//                     {" "}
//                     <b style={{ color: "aqua" }}>
//                       {item.technicianName || "Not assigned"}
//                     </b>
//                   </span>

//                 </div>

//               </div>

//             </div>

//             {/* ASSIGN SECTION */}
//             <div className="complaint-assign">

//               <select
//                 className="assign-select"
//                 value={selectedTechs[item._id] || ""}
//                 onChange={(e) =>
//                   setSelectedTechs({
//                     ...selectedTechs,
//                     [item._id]: e.target.value,
//                   })
//                 }
//               >

//                 <option value="">
//                   Select Technician
//                 </option>

//                 {technicians.map((tech) => (

//                   <option
//                     key={tech._id}
//                     value={tech._id}
//                   >
//                     {tech.name}
//                   </option>

//                 ))}

//               </select>

//               <button
//                 className="assign-btn"
//                 onClick={() =>
//                   handleAssign(item._id)
//                 }
//               >
//                 <i className="ti ti-check"></i>
//                 {" "}
//                 Assign
//               </button>

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// };

// export default Complaint;