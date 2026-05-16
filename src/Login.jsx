import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/apiRequest"; 
import "./Register.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: "",
    password: "",
    role: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      
      const data = await apiRequest("/login", "POST", {
        phone: form.phone,
        password: form.password,
        role: form.role
      });

      console.log("LOGIN DATA :", data);

      if (data.status) {
        alert("Login Successfully");

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (form.role === "technician") {
          localStorage.setItem("technicianId", data.user._id);
          navigate("/technician/technicianservice");
        } 
        else if (form.role === "user") {
          navigate("/Customers");
        } 
        else if (form.role === "admin") {
          navigate("/admin");
        }

      } else {
        alert("Login Failed : " + data.message);
      }

    } catch (err) {
      console.log(err);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="cards">

        <div className="left1">
          <h2>Welcome Back</h2>
        </div>

        <div className="right">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="technician">Technician</option>
            </select>

            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>

          </form>

          <p onClick={() => navigate("/register")}>
            New user? Register
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;































// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Register.css";

// function Login() {

//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     phone: "",
//     password: "",
//     role: ""
//   });

//   const [loading, setLoading] = useState(false);

 
//   const handleChange = (e) => {

//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });

//   };

  
//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     try {

//       setLoading(true);

//       const res = await fetch(
//         "http://localhost:7000/login",
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json"
//           },

//           body: JSON.stringify({
//             phone: form.phone,
//             password: form.password,
//             role: form.role
//           })

//         }
//       );

//       const data = await res.json();

//       console.log("LOGIN DATA :", data);

      
//       if (data.status) {

//         alert("Login Successfully");

      
//         localStorage.setItem(
//           "token",
//           data.token
//         );

        
//         localStorage.setItem(
//           "user",
//           JSON.stringify(data.user)
//         );

        
//         if (form.role === "technician") {

       
//           localStorage.setItem(
//             "technicianId",
//             data.user._id
//           );

//           console.log(
//             "TECH ID SAVED :",
//             data.user._id
//           );

//           navigate(
//             "/technician/technicianservice"
//           );

//         }

        
//         else if (form.role === "user") {

//           navigate("/Customers");

//         }

//         else if (form.role === "admin") {

//           navigate("/admin");

//         }

//       }

      
//       else {

//         alert(
//           "Login Failed : " + data.message
//         );

//       }

//     }

//     catch (err) {

//       console.log(err);

//       alert("Server Error");

//     }

//     finally {

//       setLoading(false);

//     }

//   };

//   return (

//     <div className="container">

//       <div className="cards">

      
//         <div className="left1">

//           <h2>Welcome Back</h2>

//         </div>

        
//         <div className="right">

//           <form onSubmit={handleSubmit}>

//             <h2>Login</h2>

           
//             <input
//               type="number"
//               name="phone"
//               placeholder="Phone Number"
//               value={form.phone}
//               onChange={handleChange}
//               required
//             />

          
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               required
//             />

//             <select
//               name="role"
//               value={form.role}
//               onChange={handleChange}
//               required
//             >

//               <option value="">
//                 Select Role
//               </option>

//               <option value="user">
//                 User
//               </option>

//               <option value="admin">
//                 Admin
//               </option>

//               <option value="technician">
//                 Technician
//               </option>

//             </select>

       
//             <button
//               className="btn"
//               type="submit"
//               disabled={loading}
//             >

//               {
//                 loading
//                   ? "Loading..."
//                   : "Login"
//               }

//             </button>

//           </form>

         
//           <p
//             onClick={() =>
//               navigate("/register")
//             }
//           >
//             New user? Register
//           </p>

//         </div>

//       </div>

//     </div>

//   );

// }

// export default Login;
