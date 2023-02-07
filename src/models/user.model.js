const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username required'],
      unique: [true, 'Username unique'],
    },
    password: {
      type: String,
      required: [true, 'Password required'],
      select: false,
    },
    passwordConfirmation: {
      type: String,
      required: [true, 'Password confirmation required'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords do not match',
      },
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirmation = undefined;
});

userSchema.method(
  'correctPassword',
  async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  },
);

const User = model('User', userSchema);
module.exports = User;
