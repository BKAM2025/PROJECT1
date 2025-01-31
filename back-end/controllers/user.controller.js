const { user } = require("../models/index")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Middleware to handle refresh tokens
const refreshTokenMiddleware = (req, res, next) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(403).send({ message: "Refresh token is required" });

  jwt.verify(refreshToken, "124578", (err, user) => {
    if (err) return res.status(403).send({ message: "Invalid refresh token" });

    req.user = user;
    next();
  });
};

module.exports = {
  register: async (req, resp) => {
    try {
      const { name, mail, password, role } = req.body;

      const check = await user.findOne({ where: { mail } });
      if (check) {
        return resp.status(409).send("Email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 15);

      const newUser = await user.create({ name, mail, password: hashedPassword, role });

      // Respond with the created user object
      return resp.status(201).send(newUser);
    } catch (error) {
      console.error("Error during registration:", error);
      // Sending error response with 500 status code for server errors
      return resp.status(500).json({ message: "Error during registration", error });
    }
  },
  login: async (req, res) => {
    const { mail, password } = req.body;

    try {
      const userr = await user.findOne({ where: { mail: mail } });

      if (!userr) {
        return res.status(404).send({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, userr.password);
      if (!isMatch) {
        return res.status(401).send({ message: "Incorrect password" });
      }

      const accessToken = jwt.sign({ id: userr.id, role: userr.role }, "124578", { expiresIn: "15m" });
      const refreshToken = jwt.sign({ id: userr.id, role: userr.role }, "124578");

      res.status(200).json({
        message: "Login successful",
        user: {
          id: userr.id,
          mail: userr.mail,
          accessToken,
          refreshToken
        },
      });

    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "An error occurred", error });
    }
  },
  refreshToken: (req, res) => {
    const { id, role } = req.user;
    const newAccessToken = jwt.sign({ id, role }, "accessSecretKey", { expiresIn: "15m" });
    res.status(200).json({ accessToken: newAccessToken });
  },
  deleted: (req, res) => {
    user.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        res.status(200).json({ message: "User deleted" });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Error deleting user', error });
      });
  },
  getUserIdFromToken: async (req, res) => {
    try {
      console.log(req.user)
      const currentuser = await user.findOne({ where: { id: req.user.id } })
      res.status(200).send(currentuser)
      res.send("👌👌")

    } catch (error) {
      console.error('Failed to decode token:', error);


    }

  },

  findAllUsers: (req, res) => {
    try {
      const users = user.findAll()
    } catch (err) {
      console.log("err", err)
      res.status(400).send({ "message:": err })
    }
  }
};

module.exports.refreshTokenMiddleware = refreshTokenMiddleware;


