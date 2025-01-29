const {product,user}=require("../models/index")


module.exports = {
  deleted: (req, res) => {
    product.destroy({
      where: {
        id:req.params.id
      }})
      .then(() => {
        res.status(200).json({message:"delete product"});  
      })
      .catch((error) => {
        res.status(500).json({ message: 'error to delete product', error });  
      });
  },

  getAllUser: (req, res) => {
   const allProduct= product.findAll({where:{userId:req.params.userId}})
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({ message: 'error to get all product', error });
      });
  },
  getAllProduct: (req, res) => {
    const allProduct= product.findAll()
       .then((result) => {
         res.status(200).json(result);
       })
       .catch((error) => {
         res.status(500).json({ message: 'error to get all product', error });
       });
   },
   addProduct: (req, res) => {
    const { name, price, stock, description,image } = req.body;
    product.create({  name, price, stock, description,image })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((error) => {
        res.status(500).json({ message: 'error to add product', error });
      });
    },
    updateProduct: (req, res) => {
      const { name, price, stock, description,image } = req.body;
      product.update({  name, price, stock, description,image },{where:{id:req.params.id}})
        .then((result) => {
          res.status(201).json(result);
        })
        .catch((error) => {
          res.status(500).json({ message: 'error to update product', error });
        });
    }
};


