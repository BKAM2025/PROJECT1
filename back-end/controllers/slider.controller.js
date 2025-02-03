const { slider } = require('../models/index');

module.exports = {
  getAllSliders: async (req, res) => {
    try {
      const sliders = await slider.findAll({
        order: [['id', 'ASC']]
      });
      res.status(200).json(sliders);
    } catch (error) {
      console.error('Error fetching sliders:', error);
      res.status(500).json({ message: 'Failed to fetch sliders' });
    }
  },

  createSlider: async (req, res) => {
    try {
      const { title, image, discount, buttonText, link } = req.body;
      const newSlider = await slider.create({
        title,
        image,
        discount,
        buttonText,
        link
      });
      res.status(201).json(newSlider);
    } catch (error) {
      console.error('Error creating slider:', error);
      res.status(500).json({ message: 'Failed to create slider' });
    }
  },

  updateSlider: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, image, discount, buttonText, link } = req.body;
      
      const updated = await slider.update(
        { title, image, discount, buttonText, link },
        { where: { id } }
      );

      if (updated[0] === 0) {
        return res.status(404).json({ message: 'Slider not found' });
      }

      res.status(200).json({ message: 'Slider updated successfully' });
    } catch (error) {
      console.error('Error updating slider:', error);
      res.status(500).json({ message: 'Failed to update slider' });
    }
  },

  deleteSlider: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await slider.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({ message: 'Slider not found' });
      }

      res.status(200).json({ message: 'Slider deleted successfully' });
    } catch (error) {
      console.error('Error deleting slider:', error);
      res.status(500).json({ message: 'Failed to delete slider' });
    }
  }
};