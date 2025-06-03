const express = require('express');
const router = express.Router();
const { getAllCategories ,getCategoryNameById,getCategoryById} = require('../controllers/categoryController');

router.get('/', getAllCategories);
router.get('/getCategoryNameById/:id',getCategoryNameById);
router.get('/getCategoryById/:id',getCategoryById)

module.exports = router;
