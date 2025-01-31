const {user}=require("../models/index")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

module.exports = {
  register: async (req, resp) => {
    try {
      const { name, mail, password ,role} = req.body;


      const check = await user.findOne({ where: { mail } });
      if (check) {

        return resp.status(409).send("Email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 15);

<<<<<<< HEAD

      const newUser = await user.create({ name: name, mail: mail, password: hashedPassword });
=======
     
      const newUser = await user.create({ name: name, mail: mail, password: hashedPassword ,role:role});
>>>>>>> 0b9ac64c06da9b7e49ac65cb4cc1811de7adccbf

      // Respond with the created user object
      return resp.status(201).send(newUser);
    } catch (error) {
      console.error("Error during registration:", error);
      // Sending error response with 500 status code for server errors
      return resp.status(500).json({ message: "Error during registration", error });
    }
  }
  ,
  login: async (req, res) => {
    const { mail, password } = req.body;

    try {
      const userr = await user.findOne({ where: { mail: mail } });

      if (!userr) {
        return res.status(404).send({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, userr.password);
<<<<<<< HEAD
      if (isMatch) {
        return res.status(200).json({
          message: "Login successful",
          user: {
            id: userr.id,
            mail: userr.mail,
            token: jwt.sign({ id: userr.id }, "1234", { expiresIn: "24h" })
          },
        });
      } else {
        return res.status(401).send({ message: "Incorrect password" });
      }
=======



      res.status(200).json({
        message: "Login successful",
        user: {
          id: userr.id,
          mail: userr.mail,
          token: jwt.sign({ id: userr.id ,role:userr.role}, "1234", { expiresIn: "24h" })
        },
      });

>>>>>>> 0b9ac64c06da9b7e49ac65cb4cc1811de7adccbf
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "An error occurred", error });
    }
  },

  deleted: (req, res) => {
    user.destroy({
      where: {
        id:req.params.id
      }})
      .then(() => {
        res.status(200).json({message:"delete user"});  
      })
      .catch((error) => {
        res.status(500).json({ message: 'error to delete user', error });  
      });
  },
<<<<<<< HEAD
=======
  getUserIdFromToken : async(req, res) => {
   try {
    console.log(req.user)
    const currentuser=await user.findOne({where:{id:req.user.id}})
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
>>>>>>> 0b9ac64c06da9b7e49ac65cb4cc1811de7adccbf
};


