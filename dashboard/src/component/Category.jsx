import React, { useEffect, useState } from "react"
import Navbar from "./NavBar"
import axios from "axios"
import Footer from "./Footer";
import { FaTrash, FaEdit } from 'react-icons/fa';
import "../App.css"
const Category = () => {
    const [data, setData] = useState([])
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({
        name: '',
    })
    const [categorie, setCategorie] = useState("")

    const allCategories = async () => {
        try {
            const result = await axios.get("http://localhost:5000/api/admin/allcategory")
            console.log("res from categorie", result.data)
            setData(result.data)
        }
        catch (err) {
            console.log("err", err)
        }
    }

    const destroy = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/category/${id}`)
            console.log("destroyed successfully")
            allCategories()
        }
        catch (err) {
            console.log("err", err)
        }
    }

    const handleCategorieClick = (categorie) => {
        if (editingId === categorie.id) {
            // Save changes
            try {
                axios.put(`http://localhost:5000/api/admin/updateCat/${categorie.id}`, editData)
                    .then(() => {
                        allCategories();
                        setEditingId(null);
                        setEditData({ name: '' });
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
            // Start editing
            setEditingId(categorie.id);
            setEditData({ name: categorie.name });
        }
    }
    const NewCategorie = async (name) => {
        try {
            await axios.post("http://localhost:5000/api/admin/addCat", { name })
            allCategories()
            setCategorie("")
        } catch (err) {
            console.log("err", err)
        }
    }

    useEffect(() => {
        allCategories()
    }, [])

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Category List</h2>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((cat, i) => (
                            <tr key={i}>
                                <th scope="row">{cat.id}</th>
                                <td>
                                    {editingId === cat.id ? (
                                        <input
                                            type="text"
                                            value={editData.name}
                                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                            className="form-control"
                                            autoFocus
                                        />
                                    ) : (
                                        <span>{cat.name}</span>
                                    )}
                                </td>
                                <td>
                                    <FaTrash style={{ color: 'red', cursor: 'pointer' }} onClick={() => destroy(cat.id)} />
                                    <FaEdit style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => handleCategorieClick(cat)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <input
                    value={categorie}
                    className="form-control-lg"
                    placeholder="New category"
                    style={{ borderColor: '#ff69b4' }}
                    onChange={(e) => setCategorie(e.target.value)}
                />

                <button
                    className="btn1 btn-lg btn-pink text-white "
                    onClick={() => { NewCategorie(categorie) }}
                >
                    Add Category
                </button>
            </div>
            <Footer />
        </div>
    )
}

export default Category