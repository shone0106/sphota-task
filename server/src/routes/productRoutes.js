const express = require('express');
const { getAllProducts, createProduct } = require('../controllers/productController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin')

const router = express.Router();

router.get('/', auth, getAllProducts)
router.post('/', auth, admin, createProduct)

module.exports = router;

