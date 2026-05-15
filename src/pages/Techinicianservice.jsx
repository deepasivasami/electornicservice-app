
import React, { useEffect, useState } from "react";
import "../Admin.css";

const Techinicianservice = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const techId = localStorage.getItem("technicianId");
    fetch(`http://localhost:7000/complaint/technician/${techId}`)
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch((err) => console.log(err));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:7000/complaint/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = await res.json();
      console.log(result);
      alert(`Complaint ${status} Successfully`);
      setData((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status } : item))
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main">

      <p className="main-title">Technician Complaints</p>
      <p className="main-sub">Manage your assigned service requests</p>

      <div className="table-wrap" style={{ marginTop: "16px" }}>
        <table className="data-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Device</th>
              <th>Problem</th>
              <th>Location</th>
             
              <th>Status</th>
              <th style={{ minWidth: "200px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", color: "#475569", padding: "36px" }}>
                  No Complaints Assigned
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.device}</td>
                  <td>{item.problem}</td>
                  <td>{item.location}</td>

                
                 

                  <td>
                    <span className={`badge ${
                      item.status === "Completed" ? "badge-done" :
                      item.status === "Pending"   ? "badge-prog" : "badge-open"
                    }`}>
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "nowrap" }}>
                      <button
                        onClick={() => updateStatus(item._id, "Pending")}
                        style={{
                          padding: "5px 14px",
                          borderRadius: "6px",
                          border: "1px solid rgba(251,191,36,0.4)",
                          background: "rgba(251,191,36,0.1)",
                          color: "#fbbf24",
                          fontSize: "12px",
                          fontWeight: "500",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => updateStatus(item._id, "Completed")}
                        style={{
                          padding: "5px 14px",
                          borderRadius: "6px",
                          border: "1px solid rgba(52,211,153,0.4)",
                          background: "rgba(52,211,153,0.1)",
                          color: "#34d399",
                          fontSize: "12px",
                          fontWeight: "500",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Completed
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Techinicianservice;