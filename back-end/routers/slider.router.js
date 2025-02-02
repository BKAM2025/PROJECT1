const express = require('express');
const router = express.Router();
const sliderController = require('../controllers/slider.controller');
const authMiddleware = require('../middlewares/auth');

router.get('/get', sliderController.getAllSliders);
router.post('/create', authMiddleware, sliderController.createSlider);
router.put('/update/:id', authMiddleware, sliderController.updateSlider);
router.delete('/delete/:id', authMiddleware, sliderController.deleteSlider);

module.exports = router;