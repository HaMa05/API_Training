const { promisify } = require('util');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError('Invalid username or password', 404));
  }

  try {
    const user = await User.findOne({ username }).select('+password');
    const isCorrectPassword = await user.correctPassword(
      password,
      user.password,
    );

    if (!user || !isCorrectPassword) {
      return next(new AppError('Invalid password', 401));
    }

    const token = signToken(user._id);
    res.status(200).json({ message: 'success', token, data: { user } });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

const signup = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return next(new AppError('User already exists', 400));
    }

    const user = await User.create(req.body);
    const token = signToken(user._id);

    res.status(201).json({
      status: 'success',
      token,
      data: { user },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

const protect = async (req, res, next) => {
  // TODO: Getting token and checking
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in? Please try again.', 401));
  }

  // TODO: Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const existingUser = await User.findById(decoded.id);

  if (!existingUser) {
    return next(new AppError('User not exists', 401));
  }

  req.author = existingUser._id;
  next();
};

module.exports = {
  signup,
  login,
  protect,
};
