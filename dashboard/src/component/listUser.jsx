import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaTrash, FaEdit } from 'react-icons/fa';
import Footer from './Footer';
function ListUser() {
  const [data, setData] = useState([])
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    mail: '',
    role: ''
  })
  const list = async () => {
    try {
      const result = await axios.get("http://localhost:5000/api/admin/allBuyer")
      setData(result.data)
    }
    catch (err) {
      console.log("err", err)
    }
  }
  const destroy = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/user/${id}`)
      console.log("destroyed successfully")
      list()
    }
    catch (err) {
      console.log("err", err)
    }
  }
  const handleEditClick = async (user) => {
    if (editingId === user.id) {
      try {
        await axios.put(`http://localhost:5000/api/admin//userUp/${user.id}`, editData);
        await list();
        setEditingId(null);
        setEditData({ name: '', mail: '', role: '' });
      } catch (err) {
        console.log(err);
      }
    } else {
      setEditingId(user.id);
      setEditData({
        name: user.name,
        mail: user.mail,
        role: user.role
      });
    }
  };
  useEffect(() => {
    list()
  }, [])
  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>User List</h2>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, i) => (
              <tr key={user.id}>
                <th scope="row">{i + 1}</th>
                <td>
                  {editingId === user.id ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    <span
                    >
                      {user.name}
                    </span>
                  )}
                </td>
                <td>
                  {editingId === user.id ? (
                    <input
                      type="email"
                      value={editData.mail}
                      onChange={(e) => setEditData({ ...editData, mail: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    user.mail
                  )}
                </td>
                <td>
                  {editingId === user.id ? (
                    <input
                      type="text"
                      value={editData.role}
                      onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <FaTrash
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => destroy(user.id)}
                    />
                    <FaEdit
                      style={{
                        cursor: 'pointer',
                        color: editingId === user.id ? 'green' : 'inherit'
                      }}
                      onClick={() => handleEditClick(user)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  )
}

export default ListUser

