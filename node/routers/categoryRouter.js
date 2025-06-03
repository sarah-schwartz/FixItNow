const express = require('express');
const router = express.Router();
const { getAllCategories ,getCategoryNameById} = require('../controllers/categoryController');

router.get('/', getAllCategories);
router.get('/getCategoryNameById/:id',getCategoryNameById);

module.exports = router;
