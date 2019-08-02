var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var IssueSchema = new Schema({
  title: String,
  description: String
});

var Issue = mongoose.model("Issue", IssueSchema);
module.exports = Issue;