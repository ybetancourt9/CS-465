const passport = require('passport');
const User = require('../models/user');

const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400).json({ message: 'All fields required' });
    return;
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      res.status(409).json({ message: 'A user with that email already exists' });
      return;
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      hash: '',
      salt: ''
    });

    user.setPassword(req.body.password);
    await user.save();

    res.status(200).json({ token: user.generateJWT() });
  } catch (error) {
    res.status(500).json({
      message: 'Unable to register user',
      error: error.message
    });
  }
};

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: 'All fields required' });
    return;
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      res.status(404).json(err);
      return;
    }

    if (user) {
      res.status(200).json({ token: user.generateJWT() });
      return;
    }

    res.status(401).json(info);
  })(req, res);
};

module.exports = {
  register,
  login
};
