const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const walletSchema = require('../models/wallet');
const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true},
    mobile:{type:Number,required:true},
    password:{type:String,required:true},
    companyname:{type:String,required:true},
    state:{type:String,required:true, default: 'AndhraPradesh'},
    role: { type: String, enum: ['user', 'admin', 'superAdmin'], default: 'user' },
    blocked: { type: Boolean, default: false },
    acceptTerms: { type: Boolean, required: true },
    wallet: {
        type: walletSchema, // Embed the wallet schema within the user model
        default: {
          balance: 0,
          transactions: []
        }
      }
  
});


module.exports = mongoose.model('user',userSchema);
