const mongose = require('mongoose');

const usersSchema = new mongose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
      required: true,
        unique: true,
    },
  password: {
    type: String,
    required: true
    },
  role: {
    type: String,
    required: true
    },
  status: {
    type: String,
    default: "active"
  }
});

module.exports = mongose.model('users', usersSchema);