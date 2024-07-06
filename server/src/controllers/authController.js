const User = require('../models/user');
const bcrypt = require('bcrypt');


exports.getAuthenticatedUser = async (req, res, next) => {
    try {
        const userId = req.session.user?.userId 
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};


exports.register = async (req, res) => {
    const { name, password } = req.body;

    try {
        let user = await User.findOne({ name });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }    

        const hashedPassword = await bcrypt.hash(password, 10)

        user = new User({ name, password: hashedPassword });

        await user.save();

        req.session.user = { userId: user._id, role: user.role }

        res.status(201).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { name, password } = req.body;

    try {
        let user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        req.session.user = { userId: user._id, role: user.role }

        console.log('Session after login:', req.session)
        // console.log(req.session.user)

        req.session.save((err) => {
            if (err) {
                return res.status(500).json({ message: 'Session save error' });
            }
            res.json({ userId: user._id, role: user.role });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.clearCookie('connect.sid');
        res.json({ msg: 'Logged out successfully' });
    });
};
