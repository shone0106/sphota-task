const Product = require('../models/product');
const Category = require('../models/category');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createProduct = async (req, res) => {
    const { name, categoryName, price } = req.body; 

    try {
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            return res.status(400).json({ message: 'Category not found' });
        }

        const product = new Product({
            name,
            category: category._id,
            price
        });

        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
