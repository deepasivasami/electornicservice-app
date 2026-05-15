import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTechnicians, setTotalTechnicians] = useState(0);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7000/users")
      .then(res => res.json())
      .then(data => setTotalUsers(data.length));

    fetch("http://localhost:7000/technician")
      .then(res => res.json())
      .then(data => setTotalTechnicians(data.length));

    fetch("http://localhost:7000/complaint")
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data) ? data : data.data || [];
        setTotalComplaints(list.length);
        setComplaints(list.slice(0, 4)); // recent 4 மட்டும்
      });
  }, []);

  const stats = [
    { title: "Total Users",       value: totalUsers,       cls: "blue",  icon: "ti-users" },
    { title: "Total Technician",  value: totalTechnicians, cls: "teal",  icon: "ti-tool" },
    { title: "Service Complaint", value: totalComplaints,  cls: "amber", icon: "ti-clipboard-list" },
  ];

  const getStatusClass = (status) => {
    if (!status) return "badge-open";
    const s = status.toLowerCase();
    if (s === "resolved" || s === "closed") return "badge-done";
    if (s === "in progress" || s === "pending") return "badge-prog";
    return "badge-open";
  };

  const getStatusLabel = (status) => status || "Open";

  return (
    <div className="main">

      <div className="main-title">Dashboard Overview</div>
      <div className="main-sub">Welcome back, Admin</div>

      {/* Stat Cards */}
      <div className="stats-grid">
        {stats.map((item, index) => (
          <div className={`stat-card ${item.cls}`} key={index}>
            <div className="stat-accent">
              <i className={`ti ${item.icon}`}></i>
            </div>
            <div className="stat-label">{item.title}</div>
            <div className="stat-value">{item.value}</div>
            <div className="stat-trend">↑ Live count</div>
          </div>
        ))}
      </div>

      {/* Recent Complaints */}
      <div className="section-label">Recent Complaints</div>
      <div className="recent-list">
        {complaints.length === 0 ? (
          <div className="recent-item">
            <div className="recent-item-title" style={{color:'#64748b'}}>No complaints found</div>
          </div>
        ) : (
          complaints.map((item, index) => (
            <div className="recent-item" key={index}>
              <div className="recent-icon">
                <i className="ti ti-alert-circle"></i>
              </div>
              <div>
                <div className="recent-item-title">
                  {item.issue || item.title || item.complaintType || "Complaint"}
                </div>
                <div className="recent-item-sub">
                  {item.userName || item.user || item.name || "User"}
                </div>
              </div>
              <span className={`badge ${getStatusClass(item.status)}`}>
                {getStatusLabel(item.status)}
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Dashboard;
