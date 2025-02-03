import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import "../App.css";
import Navbar from "./navBar";

const AboutUs = () => {
    return (
        <div>
            <Navbar />
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-6">
                        <h2>About Us</h2>
                        <p>
                            Welcome to Buy&Sell– your ultimate online marketplace for buying and selling everything you love!

                            At Buy&Sell, we believe in making shopping and selling as easy and seamless as possible. Whether you're looking for the latest tech gadgets, stylish fashion, home essentials, or unique handmade goods, we’ve got it all in one place. But we're not just here to help you shop—we give you the platform to showcase and sell your own products, too. It’s an online community where both buyers and sellers can thrive.
                        </p>
                        <h2> Our Mission</h2>
                        <p>

                            Our mission is to create a trusted and user-friendly marketplace that connects people from all walks of life. Whether you're a seller looking to expand your business or a shopper on the hunt for great deals, we aim to make every experience on Buy&&Sell as smooth and enjoyable as possible.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <img src="https://images.pexels.com/photos/6801651/pexels-photo-6801651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="img-fluid" />
                    </div>
                </div>

                <div className="row text-center my-4">
                    <div className="col-md-6">
                        <div className="card p-3">
                            <i className="bi bi-people-fill display-4"></i>
                            <p>Sellers active on our site</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card p-3">
                            <i className="bi bi-bag-fill display-4"></i>
                            <p>Products</p>
                        </div>
                    </div>
                </div>

                <div id="teamCarousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row text-center">
                                <div className="col-md-4">
                                    <img src="https://scontent.ftun10-2.fna.fbcdn.net/v/t39.30808-6/474771354_1821969788556032_3793443693360807870_n.jpg?stp=cp6_dst-jpg_p526x296_tt6&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Hujm0F7FIMwQ7kNvgFAw1PF&_nc_zt=23&_nc_ht=scontent.ftun10-2.fna&_nc_gid=ALl3LSCqX-3r5j-IGj4oYdm&oh=00_AYCCp8rkt15AVUVMVr4IXX7pVpHVfP9yxFvJtfpFpmKoMg&oe=67A3B645" alt="BOCHRA" className="img-fluid rounded-circle team-img" />
                                    <h5>Bochra Ben Romdhane</h5>
                                    <p>Product-Owner</p>
                                    <div>
                                        <i className="bi bi-twitter"></i>
                                        <i className="bi bi-instagram"></i>
                                        <i className="bi bi-linkedin"></i>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <img src="https://media.discordapp.net/attachments/1291763293253406832/1291813195773644933/C70FEC6E-0389-4DCC-AC3D-70C36A424C83.jpg?ex=679f018a&is=679db00a&hm=9055b1f9e7a283b7b5f6a7c528d94100360ed33a8f13b68fafdf0c2be343bbd5&=&format=webp&width=496&height=662" alt="Adem" className="img-fluid rounded-circle team-img" />
                                    <h5>Adem Maafi</h5>
                                    <p>Team Member</p>
                                    <div>
                                        <i className="bi bi-twitter"></i>
                                        <i className="bi bi-instagram"></i>
                                        <i className="bi bi-linkedin"></i>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <img src="https://scontent.ftun10-2.fna.fbcdn.net/v/t39.30808-6/475834995_1822096961876648_783278486668863678_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=DhC4twTRAywQ7kNvgGXeHyJ&_nc_zt=23&_nc_ht=scontent.ftun10-2.fna&_nc_gid=AuVBm6tTMpyheWAzR8hYsPl&oh=00_AYBxNEfC-GgcyErMadL5oY4YzgbM6ZVUAPrMdyyJzKGhQQ&oe=67A4030E" alt="Person 3" className="img-fluid rounded-circle team-img" />
                                    <h5>Khaled Akrout</h5>
                                    <p>Scram-Master</p>
                                    <div>
                                        <i className="bi bi-twitter"></i>
                                        <i className="bi bi-instagram"></i>
                                        <i className="bi bi-linkedin"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row text-center">
                                <div className="col-md-4">
                                    <img src="https://media.discordapp.net/attachments/1291763293253406832/1291813197728448532/C508CEE8-C042-48AD-A9B7-2D85CEEC1903.jpg?ex=679f018b&is=679db00b&hm=f92e7e13cb075069d1f508638fcacf29063ab46213f9566b5a4bae589b83b0c0&=&format=webp&width=496&height=662" alt="khalil" className="img-fluid rounded-circle team-img" />
                                    <h5>Khalil</h5>
                                    <p>Member</p>
                                    <div>
                                        <i className="bi bi-twitter"></i>
                                        <i className="bi bi-instagram"></i>
                                        <i className="bi bi-linkedin"></i>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <img src="https://media.discordapp.net/attachments/1291763293253406832/1291812995231387812/04A0451E-DCBA-4EF0-88AD-AC975AA88E60.jpg?ex=679f015a&is=679dafda&hm=516b50c2a9930b780d08f573b94a579e9582ba9aba90e29e48375c440bf44bf2&=&format=webp&width=496&height=662" alt="mahmood" className="img-fluid rounded-circle team-img" />
                                    <h5>Mahmood Khlifi</h5>
                                    <p>Member</p>
                                    <div>
                                        <i className="bi bi-twitter"></i>
                                        <i className="bi bi-instagram"></i>
                                        <i className="bi bi-linkedin"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#teamCarousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#teamCarousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>

        </div>

    )
}

export default AboutUs