const express = require("express");
const App = express();
const port = 5000;
const cors = require("cors")
console.log("hello");

const userRoute = require("./routers/user.router")
const RouterAdmin = require("./routers/admin.router")
App.use(cors())
App.use(express.json())
App.use(express.urlencoded({ extended: true }));

App.use("/api/user", userRoute)
App.use("/admin", RouterAdmin)
App.listen(port, () => {
  console.log(`app listening on http://127.0.0.1:${port}`);
});
