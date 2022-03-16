const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
let Profile = new Schema({
  username: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
});

module.exports = mongoose.model("EMP_Profile", Profile);
