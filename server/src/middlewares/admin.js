module.exports = (req, res, next) => {
    if (req.session.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied' });
    }
    next();
};
