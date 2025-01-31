import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import './NavBar.css'

function ListUser() {
  const [data, setData] = useState([])
  const list = async () => {
    try {
      const result = await axios.get("http://localhost:5000/api/admin/allBuyer")
      setData(result.data)
    }
    catch (err) {
      console.log("err", err)
    }
  }
  useEffect(() => {
    list()
  }, [])
  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>User List</h2>
          <span className="badge bg-primary">{data.length} Users in your app</span>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, i) => (
              <tr key={i}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.mail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListUser