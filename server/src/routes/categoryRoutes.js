const express = require('express');
const { getAllCategories, createCategory } = require('../controllers/categoryController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin')

const router = express.Router();

router.get('/', auth, getAllCategories)
router.post('/', auth, admin, createCategory)

module.exports = router;

