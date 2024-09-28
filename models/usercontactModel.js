const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userContactSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true},
    message:{type:String,required:true}
 
    
   
});

module.exports = mongoose.model('usercontact',userContactSchema);