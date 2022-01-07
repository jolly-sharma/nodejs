const mongoose = require("mongoose");

const AppSchema = mongoose.Schema(
{
  title: {
    type: String,
    minlength: 1,
    maxlength: 100
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 5000
  },
  published: Boolean
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model("Tutorialnew", AppSchema);