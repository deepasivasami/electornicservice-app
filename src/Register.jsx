// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Register.css";

// function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     address: "",
//     role: "user"
//   });
//   const [loading, setLoading] = useState(false);
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();


//     if (form.phone.length !== 10) {
//       alert("Enter valid phone number");
//       return;
//     }


//     if (form.password !== form.confirmPassword) {
//       alert("Password and Confirm Password do not match");
//       return;
//     }


//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:7000/register", {


//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           userName: form.name,
          
//           phone: form.phone,
//           password: form.password,
//           address: form.address,
//           role: form.role
//         })
//       });
//       const data = await res.json()

//       if (data.status) {
//         alert("Registered Successfully");
//         navigate("/login");
//       } else {
//         alert("Register not success " + data.message);
//       }

//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="container">
//       <div className="cards">

//         <div className="left">
//           <h2>Welcome</h2>
//           <p>Create your account</p>
//         </div>

//         <div className="right">
//           <form onSubmit={handleSubmit}>
//             <h2>Registration Form</h2>

//             <input
//               name="name"
//               placeholder="Name"
//               onChange={handleChange}
//               required
//             />

//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone"
//               onChange={handleChange}
//               required
//             />

//             <textarea
//               name="address"
//               placeholder="Address"
//               onChange={handleChange}
//             ></textarea>

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={handleChange}
//               required
//             />

//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               onChange={handleChange}
//               required
//             />

//             <button className="btn" type="submit">
//               Register
//             </button>

//             <p onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
//               Already have account? Login
//             </p>
//           </form>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Register;







import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", password: "", confirmPassword: "",
    phone: "", address: "", role: "user"
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.phone.length !== 10) return alert("Enter valid phone number");
    if (form.password !== form.confirmPassword) return alert("Passwords do not match");
    try {
      setLoading(true);
      const res = await fetch("http://localhost:7000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: form.name, phone: form.phone,
          password: form.password, address: form.address, role: form.role
        })
      });
      const data = await res.json();
      if (data.status) { alert("Registered Successfully"); navigate("/login"); }
      else alert("Register failed: " + data.message);
    } catch (err) { alert("Server error"); }
    finally { setLoading(false); }
  };

  return (
    <div className="container">
      <div className="cards">

        {/* LEFT */}
        <div className="left">
          <h2>Welcome</h2>
          <p>Create your account</p>
        </div>

        {/* RIGHT */}
        <div className="right">
          <form onSubmit={handleSubmit}>
            <h2>Registration Form</h2>

            {/* Name */}
            <div className="input-group">
              <i className="ti ti-user input-icon"></i>
              <input name="name" placeholder="Full Name" onChange={handleChange} required />
            </div>

            {/* Phone */}
            <div className="input-group">
              <i className="ti ti-phone input-icon"></i>
              <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
            </div>

            {/* Address */}
            <div className="input-group">
              <i className="ti ti-map-pin input-icon" style={{top:"14px"}}></i>
              <textarea name="address" placeholder="Address" onChange={handleChange}></textarea>
            </div>

            {/* Password */}
            <div className="input-group">
              <i className="ti ti-lock input-icon"></i>
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <i className="ti ti-lock-check input-icon"></i>
              <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
            </div>

            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

            <p onClick={() => navigate("/login")}>Already have account? Login</p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Register;