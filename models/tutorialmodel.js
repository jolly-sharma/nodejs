const mongoose = require("mongoose");

const AppSchema = mongoose.Schema(
  {
    title: 
    {
      type: String,
      minlength: 1,
      maxlength: 100,
    },
    description: 
    {
      type: String,
      minlength: 3,
      maxlength: 5000,
    },
    published: 
    {
      type: Boolean
    },
    createdAt: 
    {
      type: Date,
      default: Date.now,
    },
    updatedAt: 
    {
      type: Date,
      default: Date.now,
    }
  }
);

module.exports = mongoose.model("Tutorials", AppSchema);

/*const Tutorial = mongoose.model("Tutorialnew", AppSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Tutorial, User }*/
