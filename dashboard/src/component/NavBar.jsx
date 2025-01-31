import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MyApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/users" >Clients</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sellers" >Seller</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="categorieDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categorie
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="categorieDropdown">
                                <li><Link className="dropdown-item" to="/category/1">Category 1</Link></li>
                                <li><Link className="dropdown-item" to="/category/2">Category 2</Link></li>
                                <li><Link className="dropdown-item" to="/category/3">Category 3</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;