const { User } = require("../models/index")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {
  register: async (req, resp) => {
    try {
      const { name, mail, password } = req.body
      const check = await User.findOne({ where: { mail } })
      if (check) {
        return resp.status(404).send("mail existed")
      }
      const hachPassword = await bcrypt.hash(password, 15)
      const newuser = await User.create({ name: name, mail: mail, password: hachPassword })
      return resp.status(201).send(newuser)
    }
    catch (error) {
      console.error("Error during registration:", error);
      return resp.status(500).json({ message: "Error during registration", error });
    }

  },
  login: async (req, res) => {
    const { name, password } = req.body;

    try {
      const user = await User.findOne({ where: { name: name } });
      console.log("reached");

      console.log(user);

      if (!user) {
        return res.status(404).send({ message: "User not fnameound" });
      }


      const isMatch = await bcrypt.compare(password, user.password);


      if (!isMatch) {
        return res.status(401).send({ message: "Invalid credentials" });
      }
      res.status(200).send({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
        },
      });

    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "An error occurred", error });
    }
  },

  // currentAdmin: async (req,res) => {
  //   try {
  //     const admin = await user.findOne({ id: req.admin });
  //     res.send(admin);
  //   } catch (error) {}
  // },


  deleted: (req, res) => {
    user.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        res.status(200).json({ message: "delete user" });
      })
      .catch((error) => {
        res.status(500).json({ message: 'error to delete user', error });
      });
  },
};


