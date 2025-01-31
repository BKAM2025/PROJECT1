const { admin, product, user } = require("../models/index")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
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
      const newadmin = await admin.create({ name, mail, password: hachPassword })
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
  getALLusers: async (req, res) => {
    try {
      const allusers = await user.findAll()
      console.log("hello users:", allusers)
      res.status(200).send({ "this is your app users:": allusers })
    } catch (err) {
      console.log("err", err)
      res.status(400).send({ "message": err })
    }
  },
  getSellers: async (req, res) => {
    try {
      const allusers = await user.findAll();

      // Use Promise.all to handle asynchronous filtering
      const result = await Promise.all(
        allusers.map(async (usery) => {
          const productofOne = await product.findAll({ where: { userId: usery.id } });
          return productofOne.length > 0 ? usery : null;
        })
      );

      // Filter out null values (users without products)
      const filteredUsers = result.filter(usery => usery !== null);

      res.status(200).send(filteredUsers);
    } catch (err) {
      console.log("err", err);
      res.status(400).send({ "message": err });
    }
  },
  getBuyer: async (req, res) => {
    try {
      const allUsers = await user.findAll();

      // Use Promise.all to handle asynchronous operations
      const result = await Promise.all(
        allUsers.map(async (usery) => {
          const productsOfUser = await product.findAll({ where: { userId: usery.id } });
          return productsOfUser.length === 0 ? usery : null; // Return user if no products
        })
      );

      // Filter out null values (users with products)
      const filteredUsers = result.filter(usery => usery !== null);

      res.status(200).send(filteredUsers);
    } catch (err) {
      console.log("err", err);
      res.status(400).send({ "message": err });
    }
  }

  ,
  ProductOfOne: async (req, res) => {
    const { id } = req.params
    try {
      const result = await product.findAll({ where: { userId: id } })
      res.status(200).send(result)
    } catch (err) {
      console.log("errr", err)
      res.status(400).send(err)
    }
  }
};


