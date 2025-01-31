import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';

function ListSeller() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const list = async () => {
    try {
      const result = await axios.get("http://localhost:5000/api/admin/allSeller");
      setData(result.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    list();
  }, []);

  const handleSellerClick = (sellerId) => {
    navigate(`/seller-products/${sellerId}`);
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Seller List</h2>
          <span className="badge bg-primary">{data.length} Sellers in your app</span>
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
            {data.map((seller, i) => (
              <tr
                key={seller.id}
                className="clickable-row"
              >
                <th scope="row">{i + 1}</th>
                <td onClick={() => handleSellerClick(seller.id)}>{seller.name}</td>
                <td>{seller.mail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListSeller;