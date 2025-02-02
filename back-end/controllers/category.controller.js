const { category, product } = require("../models/index");

module.exports = {
  // Add new category
  add: async (req, res) => {
    try {
      const newCategory = await category.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: newCategory
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating category',
        error: error.message
      });
    }
  },

  // Get all categories
  getAll: async (req, res) => {
    try {
      const categories = await category.findAll({
        
      });
      res.status(200).json({
        success: true,
        data: categories
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching categories',
        error: error.message
      });
    }
  },

  // Get products by category name
   getProductByCategoryName :async (req, res) => {
    try {
        const { name } = req.params;
        
        const categoryFound = await category.findOne({
            where: { name }
        });

        if (!categoryFound) {
            return res.status(404).json({
                success: false,
                message: `Category "${name}" not found`
            });
        }

        const products = await product.findAll({
            where: { categoryId: categoryFound.id },
            include: [{
                model: category,
                attributes: ['name', 'icon']
            }]
        });

        return res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
        console.error('Error in getProductByCategoryName:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching products by category',
            error: error.message
        });
    }
},

  // Get products by category ID
  getProductByCategoryId: async (req, res) => {
    try {
      const { id } = req.params;
      const categoryWithProducts = await category.findOne({
        where: { id },
        include: [{
          model: product,
          attributes: ['id', 'name', 'price', 'description', 'image', 'stock']
        }]
      });

      if (!categoryWithProducts) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }

      res.status(200).json({
        success: true,
        data: categoryWithProducts
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching products by category ID',
        error: error.message
      });
    }
  },

  // Update category
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await category.update(req.body, {
        where: { id }
      });

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }

      const updatedCategory = await category.findByPk(id);
      res.status(200).json({
        success: true,
        message: 'Category updated successfully',
        data: updatedCategory
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating category',
        error: error.message
      });
    }
  },

  // Delete category
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await category.destroy({
        where: { id }
      });

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Category deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting category',
        error: error.message
      });
    }
  }
};