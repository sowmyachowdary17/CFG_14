import React, { useState, useEffect } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { getUsers, createUser, deleteUser } from "../api/users";

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState("ngos");
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "partner" });

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleCreateUser = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }
    await createUser(form);
    alert("User created successfully");
    setForm({ name: "", email: "", password: "", role: form.role });
    loadUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteUser(id);
      loadUsers();
    }
  };

  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <SideBar setActiveView={setActiveView} />
        <div style={{ flex: 1, padding: "20px" }}>
          {activeView === "ngos" && (
            <>
              <h2>Manage NGOs</h2>
              <UserForm form={form} setForm={setForm} role="partner" handleCreateUser={handleCreateUser} />
              <UserTable users={users.filter(u => u.role === "partner")} onDelete={handleDelete} />
            </>
          )}
          {activeView === "frontliners" && (
            <>
              <h2>Manage Frontliners</h2>
              <UserForm form={form} setForm={setForm} role="frontliner" handleCreateUser={handleCreateUser} />
              <UserTable users={users.filter(u => u.role === "frontliner")} onDelete={handleDelete} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function UserForm({ form, setForm, role, handleCreateUser }) {
  useEffect(() => { setForm(prev => ({ ...prev, role })); }, [role]);

  return (
    <div style={{ marginBottom: "30px" }}>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
      <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={inputStyle} />
      <button onClick={handleCreateUser} style={buttonStyle}>Create {role}</button>
    </div>
  );
}

function UserTable({ users, onDelete }) {
  return (
    <table border="1" cellPadding="10" width="100%">
      <thead>
        <tr><th>Name</th><th>Email</th><th>Action</th></tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td><button onClick={() => onDelete(user._id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const inputStyle = { margin: "5px", padding: "10px", width: "250px" };
const buttonStyle = { padding: "10px 20px", background: "#00509e", color: "white", border: "none", borderRadius: "5px" };
