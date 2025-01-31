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

     
      const newUser = await user.create({ name: name, mail: mail, password: hashedPassword ,role:role});

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
      const userr = await user.findOne({ where: { mail } });
      console.log(userr);

      if (!userr) {
        return res.status(404).send({ message: "User not found" });
      }


      const isMatch = await bcrypt.compare(password, userr.password);



      res.status(200).json({
        message: "Login successful",
        user: {
          id: userr.id,
          mail: userr.mail,
          token: jwt.sign({ id: userr.id ,role:userr.role}, "1234", { expiresIn: "24h" })
        },
      });

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
  },

  

   updateUser : async (req, res) => {
    const { id } = req.params; // The 'id' is provided in the URL (not 'name')
    const { mail, password } = req.body; // These come from the request body
    
    try {
      // Find user by id
      const user = await User.findOne({ where: { id } });
  
      // If the user is not found, return a 404 error
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      // Prepare the updated data
      const updatedData = {
        mail: mail || user.mail, // You only update the fields that are provided
        password: password || user.password,
      };
  
      // Update the user in the database
      const [updatedRows] = await User.update(updatedData, {
        where: { id }, // Find the user by ID
      });
  
      if (updatedRows === 0) {
        return res.status(500).send({ message: "Failed to update user" });
      }
  
      // Respond with a success message
      res.send({ message: "User successfully updated", updatedData });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }
  
}  


