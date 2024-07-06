const Sale = require('../models/sale');
const Product = require('../models/product');
const Category = require('../models/category');
const sales = require('../models/sale');


exports.recordSale = async (req, res) => {
    const { productId } = req.body;

    try {
        const product = await Product.findById(productId).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const category = product.category;
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const gstAmount = product.price * category.gstRate / 100 
        const totalPrice = product.price + gstAmount;

        const userId = req.session.user.userId

        const sale = new Sale({
            userId,
            product: productId,
            totalPrice,
            gstAmount
        });

        await sale.save()

        const newSale = await sale.populate({
            path: 'product',
            populate: {
                path: 'category',
                model: 'Category'
            }
        });
        console.log(newSale);
        res.status(201).json(newSale);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getSalesByUser = async (req, res) => {
    const { userId } = req.params;
    
    try {
        if (userId != req.session.user.userId){
            return res.status(403).json({ message : "Not authorized"});
        }
        const sales = await Sale.find({ userId }).populate({
            path: 'product',
            populate: {
                path: 'category',
                model: 'Category'
            }
        });

        res.json(sales);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}


exports.getSalesByDay = async (req, res) => {
    const { date } = req.params; // date in 'YYYY-MM-DD' format

    try {
        // Convert the date string into a Date object
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);

        const sales = await Sale.find({
            saleDate: {
                $gte: startDate,
                $lt: endDate
            }
        }).populate({
            path: 'product',
            populate: {
                path: 'category',
                model: 'Category'
            }
        });

        res.json(sales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get total revenue for a specific day, with revenue breakdown by category
exports.getTotalRevenueByDay = async (req, res) => {
    const { date } = req.params;
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    try {
        // Fetch all sales for the day
        const sales = await Sale.find({
            saleDate: {
                $gte: startDate,
                $lt: endDate
            }
        });

        const revenueByCategory = {};

        // Calculate revenue for each category
        for (const sale of sales) {
            const product = await Product.findById(sale.product);
            const category = await Category.findById(product.category);

            if (!revenueByCategory[category.name]) {
                revenueByCategory[category.name] = 0;
            }
            revenueByCategory[category.name] += sale.totalPrice;
        }

        const revenueData = Object.keys(revenueByCategory).map(category => ({
            category,
            revenue: revenueByCategory[category]
        }));

        const totalRevenue = Object.values(revenueByCategory).reduce((acc, curr) => acc + curr, 0);

        res.json({ totalRevenue, revenueData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get total revenue for a specific month, with revenue breakdown by category
exports.getTotalRevenueByMonth = async (req, res) => {
    const { year, month } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    try {
        // Fetch all sales for the month
        const sales = await Sale.find({
            saleDate: {
                $gte: startDate,
                $lt: endDate
            }
        });

        const revenueByCategory = {};

        for (const sale of sales) {
            const product = await Product.findById(sale.product);
            const category = await Category.findById(product.category)

            if (!revenueByCategory[category.name]) {
                revenueByCategory[category.name] = 0;
            }
            revenueByCategory[category.name] += sale.totalPrice;
        }

        const revenueData = Object.keys(revenueByCategory).map(category => ({
            category,
            revenue: revenueByCategory[category]
        }));
        const totalRevenue = Object.values(revenueByCategory).reduce((acc, curr) => acc + curr, 0);

        res.json({ totalRevenue, revenueData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get total revenue for a specific year, with revenue breakdown by category
exports.getTotalRevenueByYear = async (req, res) => {
    const { year } = req.params;
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 12, 1);

    try {
        // Fetch all sales for the year
        const sales = await Sale.find({
            saleDate: {
                $gte: startDate,
                $lt: endDate
            }
        });

        const revenueByCategory = {};

        // Calculate revenue for each category
        for (const sale of sales) {
            const product = await Product.findById(sale.product);
            const category = await Category.findById(product.category)

            if (!revenueByCategory[category.name]) {
                revenueByCategory[category.name] = 0;
            }
            revenueByCategory[category.name] += sale.totalPrice;
        }

        const revenueData = Object.keys(revenueByCategory).map(category => ({
            category,
            revenue: revenueByCategory[category]
        }));

        const totalRevenue = Object.values(revenueByCategory).reduce((acc, curr) => acc + curr, 0);

        res.json({ totalRevenue, revenueData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
