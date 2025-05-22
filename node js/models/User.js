const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    userName:{type: String, required: true,minLength:2},
    password: {type: String,minLength:6,required: function() {
          // אם יש googleId, הסיסמה לא נדרשת
          return !this.googleId;
        },
      },
    role: {
        type: String,
        enum: ['admin', 'developer', 'support'],
        required: true
    },
    googleId: String,
}, { timestamps: true });
module.exports = mongoose.model("User",UserSchema)