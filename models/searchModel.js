const mongoose = require('mongoose');

const navSchema = new mongoose.Schema({
  navlist1: { type: String },
  navlist2: { type: String },
  navlist3: { type: String },
  navlist4: { type: String },
  navlist5: { type: String },
  navlist6: { type: String },
  navlist7: { type: String },
  navlist8: { type: String },
  navlist9: { type: String },
  navlist10: { type: String },
});

const NavItem = mongoose.model('NavItem', navSchema);
module.exports = NavItem;
