const express = require("express");
const App = express();
const port = 5000;
const cors = require("cors")
console.log("hello");
const productRoute=require("./routers/product.router")
const userRoute = require("./routers/user.router")
const RouterAdmin = require("./routers/admin.router")
App.use(cors())
App.use(express.json())
App.use(express.urlencoded({ extended: true }));

App.use("/api/user", userRoute)
App.use("/api/admin", RouterAdmin)
App.use("/api/product", productRoute)

App.listen(port, () => {
  console.log(`app listening on http://127.0.0.1:${port}`);
});
