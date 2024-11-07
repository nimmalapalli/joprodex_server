const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user_id:{type:mongoose.Schema.ObjectId},
    //orderDetails
    orderId: {type:Number},
    orderType: {type:String},
    //userDetails
    name: {type:String},
    companyName:{type:String},
    //pickupDetails
    bill_location:{type:String},
    bill_pincode:{type:String},
    bill_city :{type:String},
    bill_state:{type:String},
    //shippingDetails
    ship_location:{type:String},
    ship_pincode:{type:String},
    ship_city:{type:String},
    ship_state:{type:String},
    //productDetails
    payment:{type:Number},
    product:{type:String},
    phone:{type:String},
    actualweight:{type:String},
    length:{type:String},
    width:{type:String},
    height:{type:String},
    volumetric_weight:{type:String},
    volumetric_weight:{type:String},
    bill_location:{type:String},
    bill_pincode:{type:String},
    bill_city :{type:String},
    bill_state:{type:String},
    orderStatus: { 
        type: String, 
        enum: ['Booked', 'Ship', 'Cancelled'],  // Restrict status values
        default: 'ship'  // Default status
      },
      date: {
        type: Date,
        default: Date.now // Automatically records the date when the transaction occurred
      }
    
 
});

module.exports = mongoose.model('order',orderSchema);