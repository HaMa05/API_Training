const express = require('express');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const workRoute = require('./routes/work.route');
const userRoute = require('./routes/user.route');

const globalErrorHandler = require('./controllers/error.controller');
const app = express();

// 1) MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

// 3) ROUTE
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/users', userRoute);
app.use('/api/v1/works', workRoute);

// use 'all' to access all http requests (get, post, delete, put, ...)
// Why we don't write this middleware on first all route
// => Because, if we do it, all http request will action this middleware and return 404. We don't want
// => So, we will take it to end route, the point when all http request not run, the middleware will actions.

app.use(globalErrorHandler);

module.exports = app;
