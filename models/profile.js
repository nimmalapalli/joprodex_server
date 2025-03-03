const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  
  profileImage: { type: String } // Store the image URL here
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
