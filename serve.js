const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
// Require and config dotenv first line of file.
// It help all file import after that can use env
const app = require('./src/app');

const port = process.env.PORT || 8000;
const DB = process.env.DATABASE_URI;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connect) => {
    console.log('DB connection successful!');
  });

app.listen(port, () => {
  console.log(`Listening port: ${port}`);
});
