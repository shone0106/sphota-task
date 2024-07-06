const express = require('express');
const { recordSale, getSalesByUser, 
    getSalesByDay, getTotalRevenueByDay,
    getTotalRevenueByMonth, getTotalRevenueByYear } = require('../controllers/salesController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin')

const router = express.Router();

router.get('/:userId', auth, getSalesByUser);
router.post('/', auth, recordSale)
router.get('/day/:date', auth, admin, getSalesByDay);
router.get('/revenue/day/:date', auth, admin, getTotalRevenueByDay);
router.get('/revenue/month/:year/:month', auth, admin, getTotalRevenueByMonth);
router.get('/revenue/year/:year', auth, admin, getTotalRevenueByYear)

module.exports = router;

