const Work = require('../models/work.model');

const getAllWorks = async (req, res, next) => {
  try {
    const works = await Work.find();
    res.status(200).json(works);
  } catch (error) {
    next(error);
  }
};

const createWork = async (req, res, next) => {
  try {
    const newWork = await Work.create(req.body);
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
    const work = await Work.findById(req.params.id);
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
    const work = await Work.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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
    const work = await Work.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'success', data: null });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

module.exports = { getAllWorks, getWork, createWork, editWork, deleteWork };
