const mongoose = require('mongoose');
const { requiredPaths } = require('./Field');

const UserSchema = mongoose.Schema({
    userName:{type: String, required: true,minLength:2},
    password: {type: String,minLength:6,required: function() {
          return !this.googleId;
        },
      },
    role: {
        type: String,
        enum: ['admin', 'developer', 'support'],
        required: true
    },
    email: {
  type: String,
  required: true,
  match: [/.+@.+\..+/, "Please enter a valid email address"]
},
    googleId: String,
}, { timestamps: true });
module.exports = mongoose.model("User",UserSchema)