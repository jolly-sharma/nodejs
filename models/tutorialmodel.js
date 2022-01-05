const mongoose = require("mongoose");

const AppSchema = mongoose.Schema(
{
  title: String,
  description: String,
  published: Boolean
},
{
  timestamp: true
});

module.exports = mongoose.model("Tutorialnew", AppSchema);