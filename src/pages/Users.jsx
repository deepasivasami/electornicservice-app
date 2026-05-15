
import React, { useEffect, useState } from "react";
const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7000/users")
      .then(res => res.json())
      .then(data => {
        console.log("DATA:", data);
        setUsers(data);
      })
      .catch(err => console.log(err));
  }, []);

 return (
  <div className="main">
    <div className="main-title">Users</div>
    <div className="main-sub">All registered users — {users.length} total</div>

    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.userName}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td style={{fontSize:"11px", color:"#475569", fontFamily:"monospace"}}>
                  {user._id?.slice(-8)}...
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{textAlign:"center", color:"#64748b", padding:"30px"}}>
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default Users;


