
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Techni = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    address: "",
    role: "technician"
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      setLoading(true);

      const res = await fetch("http://localhost:7000/technician", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.status) {
        alert("Technician registered successfully");

      } else {
        alert("Register failed: " + data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <div className="main-title">Technician</div>
      <div className="main-sub">Add a new technician</div>

      <div className="form-card">
        <div className="form-card-header">
          <div className="form-card-icon"><i className="ti ti-tool"></i></div>
          <div>
            <div className="form-card-title">Add Technician</div>
            <div className="form-card-sub">Fill in the details below</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="tech-form">
          <div className="form-group">
            <label className="form-label"><i className="ti ti-user"></i> Name</label>
            <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Enter name" />
            <span className="form-error">{errors.name}</span>
          </div>

          <div className="form-group">
            <label className="form-label"><i className="ti ti-phone"></i> Phone</label>
            <input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone" />
            <span className="form-error">{errors.phone}</span>
          </div>

          <div className="form-group">
            <label className="form-label"><i className="ti ti-lock"></i> Password</label>
            <input className="form-input" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter password" />
            <span className="form-error">{errors.password}</span>
          </div>

          <div className="form-group">
            <label className="form-label"><i className="ti ti-map-pin"></i> Address</label>
            <textarea className="form-input form-textarea" name="address" value={form.address} onChange={handleChange} placeholder="Enter address" />
            <span className="form-error">{errors.address}</span>
          </div>

          <button type="submit" className="form-submit-btn" disabled={loading}>
            {loading ? "Adding..." : <><i className="ti ti-plus"></i> Add Technician</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Techni;
