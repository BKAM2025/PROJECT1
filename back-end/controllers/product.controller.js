const { product } = require("../models/index")


module.exports = {
  deleted: (req, res) => {
    product.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        res.status(200).json({ message: "delete product" });
      })
      .catch((error) => {
        res.status(500).json({ message: 'error to delete product', error });
      });
  }
};


