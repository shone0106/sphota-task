module.exports = (req, res, next) => {
    console.log('in auth middleware')
    console.log(req.session)
    if (!req.session.user) {
        return res.status(401).json({ msg: 'User not authenticated' });
    }
    next();
};
