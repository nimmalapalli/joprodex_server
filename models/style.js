// models/Style.js
const mongoose = require('mongoose');

const styleSchema = new mongoose.Schema({
  backgroundColor: { type: String, required: true },
  textColor: { type: String, required: true },
  fontSize: { type: String, required: true },
  fontFamily: { type: String, required: true },
  navBarHeight: { type: String, required: true },
  sideNavWidth: { type: String, required: true }
});

const Style = mongoose.model('Style', styleSchema);

module.exports = Style;
