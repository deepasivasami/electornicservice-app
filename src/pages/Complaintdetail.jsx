
import React, { useState, useRef } from "react";
import "../Admin.css"

const Complaintdetail = () => {
  const [form, setForm] = useState({
    name: "", phone: "", device: "", model: "",
    problem: "", serviceType: "", address: "", location: "", image: ""
  });
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm({ ...form, image: reader.result });
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:7000/complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok && data.status) { alert("Complaint Submitted"); window.location.reload(); }
      else alert(data.message || "Something went wrong");
    } catch (err) { alert("Server error"); }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) { alert("Camera access denied"); }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    setForm({ ...form, image: canvas.toDataURL("image/png") });
  };

  return (
    <div className="main">
      <div className="main-title">Complaint Form</div>
      <div className="main-sub">Fill in your device issue details below</div>

      <div className="form-card" style={{ maxWidth: "680px" }}>

        <div className="form-card-header">
          <div className="form-card-icon">
            <i className="ti ti-clipboard-list"></i>
          </div>
          <div>
            <div className="form-card-title">New Complaint</div>
            <div className="form-card-sub">All fields are required</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="tech-form">

          {/* Name + Phone */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
            <div className="form-group">
              <label className="form-label"><i className="ti ti-user"></i> Customer Name</label>
              <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Enter name" required />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label className="form-label"><i className="ti ti-phone"></i> Mobile Number</label>
              <input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone" required />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>
          </div>

          {/* Device + Model */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
            <div className="form-group">
              <label className="form-label"><i className="ti ti-device-mobile"></i> Device Type</label>
              <select className="form-input" name="device" value={form.device} onChange={handleChange} required>
                <option value="">Select Device</option>
                <option value="mobile">Mobile</option>
                <option value="laptop">Laptop</option>
                <option value="computer">Computer</option>
              </select>
              {errors.device && <span className="form-error">{errors.device}</span>}
            </div>
            <div className="form-group">
              <label className="form-label"><i className="ti ti-tag"></i> Model</label>
              <input className="form-input" name="model" value={form.model} onChange={handleChange} placeholder="Enter model" required />
            </div>
          </div>

          {/* Service Type + Location */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
            <div className="form-group">
              <label className="form-label"><i className="ti ti-tool"></i> Service Type</label>
              <select className="form-input" name="serviceType" value={form.serviceType} onChange={handleChange} required>
                <option value="">Select Service</option>
                <option value="repair">Repair</option>
                <option value="software">Software</option>
                <option value="hardware">Hardware</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label"><i className="ti ti-map-pin"></i> City / Area</label>
              <input className="form-input" name="location" value={form.location} onChange={handleChange} placeholder="Enter location" required />
              {errors.location && <span className="form-error">{errors.location}</span>}
            </div>
          </div>

          {/* Problem */}
          <div className="form-group">
            <label className="form-label"><i className="ti ti-alert-circle"></i> Problem Description</label>
            <textarea className="form-input form-textarea" name="problem" value={form.problem} onChange={handleChange} placeholder="Describe your issue..." required />
            {errors.problem && <span className="form-error">{errors.problem}</span>}
          </div>

          {/* Camera */}
          <div className="form-group">
            <label className="form-label"><i className="ti ti-camera"></i> Device Photo</label>
            <div style={{ display:"flex", gap:"10px", marginBottom:"10px" }}>
              <button type="button" className="assign-btn" onClick={startCamera}>
                <i className="ti ti-camera"></i> Open Camera
              </button>
              <button type="button" className="assign-btn" style={{ background:"rgba(0,255,255,0.15)", color:"aqua" }} onClick={captureImage}>
                <i className="ti ti-camera-selfie"></i> Capture Photo
              </button>
            </div>
            <video ref={videoRef} autoPlay style={{
              width:"100%", maxWidth:"300px", borderRadius:"10px",
              border:"1px solid rgba(0,255,255,0.2)", display:"block"
            }} />
            <canvas ref={canvasRef} style={{ display:"none" }} />
            {form.image && (
              <img src={form.image} alt="captured" style={{
                width:"120px", height:"120px", objectFit:"cover",
                borderRadius:"10px", marginTop:"10px",
                border:"2px solid rgba(0,255,255,0.3)"
              }} />
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="form-submit-btn">
            <i className="ti ti-send"></i> Submit Complaint
          </button>

        </form>
      </div>
    </div>
  );
};

export default Complaintdetail;