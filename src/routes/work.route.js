const express = require('express');
const workController = require('../controllers/work.controller');
const authController = require('../controllers/auth.controllers');

const route = express.Router();

route
  .route('/')
  .get(authController.protect, workController.getAllWorks)
  .post(authController.protect, workController.createWork);

route
  .route('/:id')
  .get(authController.protect, workController.getWork)
  .patch(authController.protect, workController.editWork)
  .delete(authController.protect, workController.deleteWork);

module.exports = route;
