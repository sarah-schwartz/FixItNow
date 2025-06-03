const Category = require('../models/Category');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error loading categories', error: err });
  }
};

const getCategoryNameById = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id })
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.status(200).send(category.name)
  } catch (err) {
    res.status(500).send({ message: "Server error", error: err });
  }
}

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id })
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.status(200).send(category)
  } catch (err) {
    res.status(500).send({ message: "Server error", error: err });
  }
}

module.exports = { getAllCategories ,getCategoryNameById,getCategoryById};
