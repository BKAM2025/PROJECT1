const {user}=require("../models/index")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

module.exports = {
  register: async (req, resp) => {
    try {
      const { name, mail, password } = req.body;

    
      const check = await user.findOne({ where: { mail } });
      if (check) {
        
        return resp.status(409).send("Email already exists");
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 15);

      // Create a new user in the database
      const newUser = await user.create({ name: name, mail: mail, password: hashedPassword });

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
    const usery = await user.findOne({ where: { mail: mail} });
    console.log("reached");

    console.log(usery);
  
    if (!usery) {
      return res.status(404).send({ message: "User not found" });
    }

   
    const isMatch = await bcrypt.compare(password, usery.password);



      res.status(200).json({
        message: "Login successful",
        user: {
          id: usery.id,
          mail: usery.mail,
          token: jwt.sign({ id: usery.id }, "1234", { expiresIn: "24h" })
        },
      });
      if (!isMatch) {
        return res.status(401).send({ message: "Invalid credentials" });
      }

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
  

  findAllUsers: (req, res) => {
    try {
      const users = user.findAll()
    } catch (err) {
      console.log("err", err)
      res.status(400).send({ "message:": err })
    }
  }
};


