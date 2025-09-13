import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";


function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    try {
      await deleteDoc(doc(db, "users", id));
      setUsers(users.filter(user => user.id !== id));
      alert("User deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    }
  }
};
    const [editingUser, setEditingUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

const handleEdit = (user) => {
  setEditingUser(user);
  setName(user.name);
  setEmail(user.email);
  setPhone(user.phone);
};

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const userRef = doc(db, "users", editingUser.id);
    await updateDoc(userRef, { name, email, phone });

    


    // Update state locally
    setUsers(users.map(u => u.id === editingUser.id ? { ...u, name, email, phone } : u));
    setEditingUser(null);
    alert("User updated successfully!");
  } catch (err) {
    console.error(err);
    alert("Error updating user");
  }
};


  // 🔄 Fetch data from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // 🔍 Filter based on search
  const filteredUsers = users.filter(user =>
  user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
);


  // ⬆️ Sort by key
  const sortBy = (key) => {
    const sorted = [...filteredUsers].sort((a, b) =>
      a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1
    );
    setUsers(sorted);
    setSortKey(key);
  };

  return (
    <div className="container mt-5">
      <h2>Registered Users</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by name"
        className="form-control mb-3"
        onChange={(e) => setSearchTerm(e.target.value)}
      /> 
      

      {/* 🧾 User Table */}
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th onClick={() => sortBy("name")} style={{ cursor: 'pointer' }}>
              Name {sortKey === "name" && "🔼"}
            </th>
            <th onClick={() => sortBy("email")} style={{ cursor: 'pointer' }}>
              Email {sortKey === "email" && "🔼"}
            </th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td> <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}> Delete</button>
              </td>
              <td><button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(user)}>Edit</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Optional: Cards view for mobile */}
       {/*{filteredUsers.map(user => (
        <div className="card mb-3" key={user.id}>
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">Email: {user.email}</p>
            <p className="card-text">Phone: {user.phone}</p>
          </div>
        </div>
      ))}*/ }

{editingUser && (
  <form onSubmit={handleUpdate} className="mt-4">
    <h4>Update User</h4>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control mb-2" />
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-2" />
    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control mb-2" />
    <button type="submit" className="btn btn-success me-2">Update</button>
    <button type="button" className="btn btn-secondary" onClick={() => setEditingUser(null)}>Cancel</button>
  </form>
)}


    </div>
  );
}

export default UserList;
