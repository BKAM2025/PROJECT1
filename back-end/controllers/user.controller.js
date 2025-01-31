const { user } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, resp) => {
    try {
      const { name, mail, password, role } = req.body;

      // Check if the email already exists
      const check = await user.findOne({ where: { mail } });
      if (check) {
        return resp.status(409).send({ message: "Email already exists" });
      }

      // Hash the password securely
      const hashedPassword = await bcrypt.hash(password, 15);

      // Create the new user
      const newUser = await user.create({
        name,
        mail,
        password: hashedPassword,
        role
      });

      return resp.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("Error during registration:", error);
      return resp.status(500).json({ message: "Error during registration", error });
    }
  },

  login: async (req, res) => {
    const { mail, password } = req.body;

    try {
      const userr = await user.findOne({ where: { mail } });

      if (!userr) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, userr.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = jwt.sign(
        { id: userr.id, role: userr.role },
        process.env.JWT_SECRET || "supersecuresecret",
        { expiresIn: "24h" }
      );

      res.status(200).json({
        message: "Login successful",
        user: {
          id: userr.id,
          mail: userr.mail,
          token
        }
      });

    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "An error occurred during login", error });
    }
  },

  deleted: async (req, res) => {
    try {
      const deletedUser = await user.destroy({
        where: { id: req.params.id }
      });

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Error deleting user", error });
    }
  },

  getUserIdFromToken: async (req, res) => {
    try {
      console.log(req.user);
      const currentUser = await user.findOne({ where: { id: req.user.id } });

      if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(currentUser);
    } catch (error) {
      console.error("Failed to get user from token:", error);
      res.status(500).json({ message: "Error retrieving user", error });
    }
  },

  findAllUsers: async (req, res) => {
    try {
      const users = await user.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Error fetching users", error });
    }
  }
};
