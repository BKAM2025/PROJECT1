const { category} = require("../models/index")

module.exports = {
  add: (req, res) => {
    category.create(req.body)
      .then((category) => {
        res.status(200).json(category)
      })
      .catch((error) => {
        res.status(500).json({ message: 'Error to add category', error })
      })
  },
  getAll: (req, res) => {
    category.findAll()
      .then((category) => {
        res.status(200).json(category)
      })
      .catch((error) => {
        res.status(500).json({ message: 'Error to get category', error })
      })
  },
  getProductBycategoryName: (req, res) => {
    const categoryName = req.params.name

    category.findOne({
      where: { category: categoryName },
      include: [{
        model: car,
        required: true,
        attributes: ['matricule', 'marque', 'model', 'carburant', 'price', 'imageUrl', 'disponible'],
      }]
    })
    .then(category => {
      if (category) {
        res.status(200).json(category.cars)
      } else {
        res.status(404).json({ message: 'Category not found' })
      }
    })
    .catch(err => {
      console.error('Error fetching cars:', err)
      res.status(500).json({ message: 'Internal Server Error' })
    })
  },

  getcarsByCategoryId: (req, res) => {
    const categoryId = req.params.categoryId

    category.findOne({
      where: { id: categoryId },
      include: [{
        model: car,
        required: true,
        attributes: ['matricule', 'marque', 'moodel', 'carburant', 'price', 'imageUrl', 'disponible'],
      }]
    })
    .then(category => {
      if (category) {
        res.status(200).json(category.cars)
      } else {
        res.status(404).json({ message: 'Category not found' })
      }
    })
    .catch(err => {
      console.error('Error fetching cars:', err)
      res.status(500).json({ message: 'Internal Server Error' })
    })
  },
}
