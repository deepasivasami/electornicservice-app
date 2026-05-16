
import React, { useEffect, useState } from "react";

const Technician = () => {

  const [complaints, setComplaints] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {

    // COMPLAINTS
    fetch("http://localhost:7000/complaint")
      .then((res) => res.json())
      .then((data) => {
        console.log("COMPLAINTS :", data);
        setComplaints(data);
      })
      .catch((err) => console.log(err));

    // TECHNICIANS
    fetch("http://localhost:7000/technician")
      .then((res) => res.json())
      .then((data) => {
        console.log("TECHNICIANS :", data);
        setTechnicians(data);
      })
      .catch((err) => console.log(err));

  }, []);

  return (
    <div className="main">

      <div className="main-title">
        Technician & User Details
      </div>

      <div className="main-sub">
        Assigned Complaint Details
      </div>

      <div className="complaint-grid">

        {complaints.map((item) => {

          // MATCH TECHNICIAN
          const tech = technicians.find(
            (t) => t.name === item.technicianName
          );

          return (

            <div
              className="complaint-card"
              key={item._id}
            >

              {/* HEADER */}
              <div className="complaint-card-header">

                <div className="complaint-icon">
                  <i className="ti ti-tool"></i>
                </div>

                <div style={{ flex: 1 }}>

                  <div className="complaint-problem">
                    {item.problem}
                  </div>

                  <div className="complaint-device">
                    {item.device}
                  </div>

                </div>

              </div>

              {/* BODY */}
              <div className="complaint-body">

                <div className="complaint-info-grid">

                  {/* USER NAME */}
                  <div className="complaint-info-item">
                    <i className="ti ti-user"></i>

                    <span>
                      User :
                      {" "}
                      <b>{item.name}</b>
                    </span>
                  </div>

                  {/* USER PHONE */}
                  <div className="complaint-info-item">
                    <i className="ti ti-phone"></i>

                    <span>
                      User Phone :
                      {" "}
                      <b>{item.phone}</b>
                    </span>
                  </div>

                  {/* TECHNICIAN NAME */}
                  <div className="complaint-info-item">
                    <i className="ti ti-tool"></i>

                    <span>
                      Technician :
                      {" "}
                      <b style={{ color: "aqua" }}>
                        {item.technicianName || "Not Assigned"}
                      </b>
                    </span>
                  </div>

                  {/* TECHNICIAN PHONE */}
                  <div className="complaint-info-item">
                    <i className="ti ti-device-mobile"></i>

                    <span>
                      Tech Phone :
                      {" "}
                      <b style={{ color: "orange" }}>
                        {tech?.phone || "No Phone"}
                      </b>
                    </span>
                  </div>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
};

export default Technician;