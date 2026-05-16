import React, { useEffect, useState } from "react";
import { apiRequest } from "../api/apiRequest"; 
import "../Admin.css";

const AllComplaint = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    
    const fetchComplaints = async () => {
      const resData = await apiRequest("/complaint");
      console.log("ALL COMPLAINTS:", resData);
      if (resData && Array.isArray(resData)) {
        setData(resData);
      }
    };

    fetchComplaints();
  }, []);

  
  const getImageUrl = (image) => {
    return `https://serviceapp-1-mqaj.onrender.com/uploads/${image}`; 
  };

  const filtered = filter === "All"
    ? data
    : data.filter((item) => item.status === filter);

  return (
    <div
      className="main"
      style={{
        background: "linear-gradient(135deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 100%)",
        minHeight: "100vh",
        padding: "24px",
      }}
    >
     
      <p style={{ fontSize: "18px", fontWeight: "600", color: "#e0e7ff", marginBottom: "4px" }}>
        All Complaints
      </p>
      <p style={{ fontSize: "12px", color: "#6366f1", marginBottom: "20px" }}>
        All service requests and their current status
      </p>

      {/* ── FILTER BUTTONS ── */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
        {["All", "Pending", "Completed", "Assigned"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 18px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              border: "1px solid",
              transition: "all 0.2s",
              ...(filter === f
                ? f === "Pending"
                  ? { background: "rgba(251,191,36,0.2)", color: "#fbbf24", borderColor: "#fbbf24" }
                  : f === "Completed"
                  ? { background: "rgba(16,185,129,0.2)", color: "#10b981", borderColor: "#10b981" }
                  : f === "Assigned"
                  ? { background: "rgba(99,102,241,0.2)", color: "#818cf8", borderColor: "#818cf8" }
                  : { background: "rgba(0,255,255,0.15)", color: "aqua", borderColor: "aqua" }
                : { background: "transparent", color: "#475569", borderColor: "rgba(255,255,255,0.1)" }
              ),
            }}
          >
            {f}
            <span style={{
              marginLeft: "6px", padding: "1px 6px",
              borderRadius: "10px", fontSize: "10px",
              background: "rgba(255,255,255,0.1)", color: "inherit",
            }}>
              {f === "All" ? data.length : data.filter(d => d.status === f).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── CARDS ── */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", color: "#475569", padding: "60px", fontSize: "14px" }}>
          No Complaints Found
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "16px",
        }}>
          {filtered.map((item, index) => (
            <div
              key={item._id}
              className="complaint-card"
              style={{
                transition: "border-color 0.2s",
                borderLeft: item.status === "Completed"
                  ? "3px solid #10b981"
                  : item.status === "Pending"
                  ? "3px solid #fbbf24"
                  : "3px solid #818cf8",
              }}
            >
              {/* CARD HEADER */}
              <div className="complaint-card-header">
                <div className="complaint-icon">
                  <i className="ti ti-device-mobile"></i>
                </div>
                <div style={{ flex: 1 }}>
                  <p className="complaint-problem">{item.problem}</p>
                  <p className="complaint-device">
                    <i className="ti ti-cpu" style={{ fontSize: "13px" }}></i>
                    {item.device}
                  </p>
                </div>
                <span style={{
                  padding: "3px 10px", borderRadius: "20px",
                  fontSize: "11px", fontWeight: "600", whiteSpace: "nowrap",
                  ...(item.status === "Completed"
                    ? { background: "rgba(16,185,129,0.15)", color: "#10b981" }
                    : item.status === "Pending"
                    ? { background: "rgba(251,191,36,0.15)", color: "#fbbf24" }
                    : { background: "rgba(99,102,241,0.15)", color: "#818cf8" })
                }}>
                  {item.status}
                </span>
              </div>

              {/* CARD BODY */}
              <div className="complaint-body">
               
                {item.image && (
                  <img
                    src={getImageUrl(item.image)}
                    alt="complaint"
                    onError={(e) => { e.target.style.display = "none"; }}
                    style={{
                      width: "100%", height: "130px", objectFit: "cover",
                      borderRadius: "8px", marginBottom: "12px",
                      border: "1px solid rgba(0,255,255,0.15)",
                    }}
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
                    <span>{item.technicianId?.name || item.technicianId || "Not Assigned"}</span>
                  </div>
                </div>
              </div>

              {/* CARD FOOTER */}
              <div style={{
                padding: "10px 16px", borderTop: "1px solid rgba(0,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "rgba(0,0,0,0.1)",
              }}>
                <span style={{ fontSize: "11px", color: "#475569" }}>
                  #{index + 1} &nbsp;·&nbsp; {item.device}
                </span>
                <span style={{ fontSize: "11px", color: "#334155" }}>
                  {item.image ? "" : "No Image"}
                </span>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllComplaint;