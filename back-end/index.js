const express = require("express");
const App = express();
const port = 5000;
const Stripe = require("stripe");
const cors = require("cors")
console.log("hello");
const productRoute = require("./routers/product.router")
const RouterCart = require("./routers/cart.router")
const userRoute = require("./routers/user.router")
const RouterAdmin = require("./routers/admin.router")
const RouterProduct = require("./routers/product.router")
const RouterPayment = require("./routers/Payment")

const RouterIsFavorite = require("./routers/isFavorite.router")

App.use(cors())
App.use(express.json())
App.use(express.urlencoded({ extended: true }));

App.use("/api/user", userRoute)
App.use("/api/admin", RouterAdmin)
App.use("/api/product", productRoute)

App.use("/api/cart", RouterCart);
App.use("/api/product", RouterProduct)
App.use("/api/isFavorite", RouterIsFavorite)

App.use("/api/Payment", RouterPayment)

App.listen(port, () => {
  console.log(`app listening on http://127.0.0.1:${port}`);
});
