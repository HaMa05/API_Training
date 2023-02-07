const swaggerAutogen = require('swagger-autogen');

const outputFile = './swagger.json';
const endpoints = ['./src/routes/user.route.js', './src/routes/work.route.js'];

swaggerAutogen(outputFile, endpoints).then(() => {
  require('./serve');
});
