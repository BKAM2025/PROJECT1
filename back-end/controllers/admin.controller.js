const { product, user, category } = require("../models/index")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
module.exports = {
  register: async (req, resp) => {
    try {
      const { name, mail, password, imgUrl } = req.body
      const check = await user.findOne({ where: { mail: mail } })
      if (check) {
        return resp.status(404).send("mail existed")
      }
      const hachPassword = await bcrypt.hash(password, 15)
      const newadmin = await user.create({ name, mail, password: hachPassword, role: "admin", imgUrl })
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
      const admi = await user.findOne({ where: { mail, role: "admin", } });
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
      const allusers = await user.findAll({
        where: {
          [Op.or]: [
            { role: "user" },
            { role: "seller" }
          ]
        }
      })
      console.log(allusers)
      res.status(200).send(allusers)
    } catch (err) {
      console.log("err", err)
      res.status(400).send({ "message": err })
    }
  },
  getSellers: async (req, res) => {
    try {
      const allusers = await user.findAll({ where: { role: "seller" } })
      console.log(allusers)
      res.status(200).send(allusers)
    } catch (err) {
      console.log("err", err)
      res.status(400).send({ "message": err })
    }
  },
  getBuyer: async (req, res) => {
    try {
      const allusers = await user.findAll({ where: { role: "user" } })
      console.log(allusers)
      res.status(200).send(allusers)
    } catch (err) {
      console.log("err", err)
      res.status(400).send({ "message": err })
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
  },
  gettAllcategory: async (req, res) => {
    try {
      const result = await category.findAll()
      res.status(200).send(result)
    } catch (err) {
      console.log("errr", err)
      res.status(400).send(err)
    }
  },
  addCategoryAdmin: async (req, res) => {
    const { name } = req.body
    try {
      const cat = await category.create({ name })
      res.status(200).send(cat)
    } catch (err) {
      console.log("errr", err)
      res.status(400).send(err)
    }
  },
  deleteProductAdmin: async (req, res) => {
    const { id } = req.params
    try {
      await product.destroy({ where: { id } })
      res.status(200).send("destroyed successfully")
    } catch (err) {
      console.log("errr", err)
      res.status(400).send(err)
    }
  },
  createCategorie: async (req, res) => {
    const { name } = req.body
    try {
      await category.create({ name })
      res.status(200).send("created successfully")
    } catch (err) {
      console.log("errr", err)
      res.status(400).send(err)
    }
  },
  deleteCategoryAdmin: async (req, res) => {
    const { id } = req.params
    try {
      await category.destroy({ where: { id } })
      res.status(200).send("destroyed successfully")
    } catch (err) {
      console.log("errr", err)
      res.status(400).send(err)
    }
  },
  deleteUserAdmin: async (req, res) => {
    const { id } = req.params
    try {
      await user.destroy({ where: { id } })
      res.status(200).send("destroyed successfully")
    } catch (err) {
      console.log("errr", err)
      res.status(400).send(err)
    }
  },
  UpdateCategory: async (req, res) => {
    const { name } = req.body
    const { id } = req.params
    try {
      await category.update({ name }, { where: { id } })
      res.status(200).send("updated successfully")
    } catch (err) {
      console.log("errr", err)
      res.status(400).send(err)
    }
  },
  UpdateUser: async (req, res) => {
    const { name, role, mail } = req.body
    const { id } = req.params
    try {
      await user.update({ name, role, mail }, { where: { id } })
      res.status(200).send("updated successfully")
    } catch (err) {
      console.log("errr", err)
      res.status(400).send(err)
    }
  },
  getOneAdmin: async (req, res) => {
    const { id } = req.params
    try {
      const one = await user.findOne({ where: { id: id, role: "admin" } })
      res.status(200).send(one)
    } catch (err) {
      console.log("errr", err)
      res.status(400).send(err)
    }
  },
  UpdateAdmine: async (req, res) => {
    const { name, mail, address, lastname, imgUrl } = req.body
    const { id } = req.params
    try {
      await user.update({ name, mail, address, lastname, imgUrl }, { where: { id } })
      res.status(200).send("updated successfully")
    } catch (err) {
      console.log("errr", err)
      res.status(400).send(err)
    }
  }
};

