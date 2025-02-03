import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Footer from './Footer';

function ListSeller() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    mail: '',
    role: ''
  });

  const list = async () => {
    try {
      const result = await axios.get("http://localhost:5000/api/admin/allSeller");
      setData(result.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  const destroy = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/user/${id}`);
      list();
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleEditClick = async (seller) => {
    if (editingId === seller.id) {
      try {
        await axios.put(`http://localhost:5000/api/admin//userUp/${seller.id}`, editData);
        await list();
        setEditingId(null);
        setEditData({ name: '', mail: '', role: '' });
      } catch (err) {
        console.log(err);
      }
    } else {
      setEditingId(seller.id);
      setEditData({
        name: seller.name,
        mail: seller.mail,
        role: seller.role
      });
    }
  };

  const handleSellerClick = (sellerId) => {
    navigate(`/seller-products/${sellerId}`);
  };

  useEffect(() => {
    list();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Seller List</h2>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope='col'>Role</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((seller, i) => (
              <tr key={seller.id}>
                <th scope="row">{i + 1}</th>
                <td>
                  {editingId === seller.id ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleSellerClick(seller.id)}
                    >
                      {seller.name}
                    </span>
                  )}
                </td>
                <td>
                  {editingId === seller.id ? (
                    <input
                      type="email"
                      value={editData.mail}
                      onChange={(e) => setEditData({ ...editData, mail: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    seller.mail
                  )}
                </td>
                <td>
                  {editingId === seller.id ? (
                    <input
                      type="text"
                      value={editData.role}
                      onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    seller.role
                  )}
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <FaTrash
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => destroy(seller.id)}
                    />
                    <FaEdit
                      style={{
                        cursor: 'pointer',
                        color: editingId === seller.id ? 'green' : 'inherit'
                      }}
                      onClick={() => handleEditClick(seller)}
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
  );
}

export default ListSeller;