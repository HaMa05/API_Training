const Work = require('../models/work.model');
const AppError = require('../utils/appError');

const getAllWorks = async (req, res, next) => {
  try {
    const works = await Work.find({ author: req.author }).select('-author');
    res.status(200).json(works);
  } catch (error) {
    next(error);
  }
};

const createWork = async (req, res, next) => {
  try {
    const newWork = await Work.create({
      ...req.body,
      author: req.author,
    });
    res.status(201).json({ message: 'success', data: { work: newWork } });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

const getWork = async (req, res, next) => {
  try {
    const work = await Work.findOne({
      _id: req.params.id,
      author: req.author,
    }).select('-author');

    res.status(200).json({
      status: 'success',
      data: {
        work,
      },
    });
  } catch (error) {
    res.status(404),
      json({
        status: 'fail',
        message: error,
      });
  }
};

const editWork = async (req, res, next) => {
  try {
    const work = await Work.findOneAndUpdate(
      {
        _id: req.params.id,
        author: req.author,
      },
      req.body,
      {
        new: true,
      },
    ).select('-author');

    if (!work) {
      return next(new AppError('Work not found', 401));
    }

    res.status(200).json({ message: 'success', data: { work } });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

const deleteWork = async (req, res, next) => {
  try {
    const work = await Work.findOneAndRemove({
      _id: req.params.id,
      author: req.author,
    });

    if (!work) {
      return next(new AppError('Work not found', 401));
    }

    res.status(200).json({ message: 'success', data: null });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

module.exports = { getAllWorks, getWork, createWork, editWork, deleteWork };
