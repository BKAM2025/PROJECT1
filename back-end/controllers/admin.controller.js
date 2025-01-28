const { admin } = require("../models/index")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
console.log("hello")
module.exports = {
  register: async (req, resp) => {
    try {
      const { name, mail, password } = req.body
      const check = await admin.findOne({ where: { mail } })
      if (check) {
        return resp.status(404).send("mail existed")
      }
      const hachPassword = await bcrypt.hash(password, 15)
      const newadmin = await admin.create({ name: name, mail: mail, password: hachPassword })
      return resp.status(201).send(newadmin)
    }
    catch (error) {
      console.error("Error during registration:", error);
      return resp.status(500).json({ message: "Error during registration", error });
    }

  },
  login: async (req, res) => {
    try {
      const { mail, password } = req.body;
      const admi = await admin.findOne({ where: { mail } });
      if (!admi) {
        return res
          .status(404)
          .send({ message: "mail or password is incorrect" });
      }
      const comparePassword = await bcrypt.compare(password, admi.password);
      if (!comparePassword) {
        return res
          .status(401)
          .send({ message: "mail or password is incorrect" });
      }
      const token = jwt.sign({ id: admi.id }, "1234", { expiresIn: "24h" });
      return res.status(201).send({ message: "Login success", admi, token });
    } catch (error) {
      console.log(error);
    }
  },
  // currentAdmin: async (req,res) => {
  //   try {
  //     const admin = await admin.findOne({ id: req.admin });
  //     res.send(admin);
  //   } catch (error) {}
  // },


  deleted: (req, res) => {
    admin.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        res.status(200).json({ message: "delete admin" });
      })
      .catch((error) => {
        res.status(500).json({ message: 'error to delete admin', error });
      });
  },
};


