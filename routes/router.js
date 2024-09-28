const express = require('express');
const router = express.Router();
const Crud = require('../models/order');
const User = require('../models/user')

router.post('/createorder', (req, res, next) => {
    try {
    const newcrud = new Crud({  
 //orderDetails
    user_id:req.body.user_id,
    orderId:req.body.orderId,
    orderType: req.body.orderType,
    //userDetails
    name: req.body.name,
    companyName:req.body.companyName,
    //pickupDetails
    pickup_location:req.body.pickup_location,
    pickup_pincode:req.body.pickup_pincode,
    pickup_city:req.body.pickup_city,
    pickup_state:req.body.pickup_state,
    //shippingDetails
    ship_location:req.body.ship_location,
    ship_pincode:req.body.ship_pincode,
    ship_city:req.body.ship_city,
    ship_state:req.body.ship_state,
    //productDetails
    payment:req.body.payment,
    product:req.body.product,
    phone:req.body.phone,
    weight:req.body.weight,
    length:req.body.length,
    width:req.body.width,
    height:req.body.height,
      orderStatus: req.body.orderStatus || 'Ship'

    })

    newcrud.save()
    res.json({ data:newcrud,success: true, message: 'Order CREATED SUCCESSFULLY' });
} catch (err) {

   
    res.json({ success: false, message: 'order failed' });
}
});


router.get('/read/', async (req, res, next) => {

    try {
        const cruds = await Crud
        .aggregate([
            
            {
                $lookup:{
                  from:User.collection.name,
                  localField:'user_id',
                  foreignField:'_id',
                  as:'userDetails'
                }
            }
        ])
     
        res.status(200).json({ data: cruds, message: 'Cruds retrieved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})


router.get('/order/:id', async (req, res) => {
  try {
      const order = await Crud.findById(req.params.id); // Fetch a single order by ID
      if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
      res.json({ data: order, success: true });
  } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to fetch order', error: err.message });
  }
});
// Update Order by ID
router.put('/order/:id', async (req, res) => {
  try {
      const updatedOrder = await Crud.findByIdAndUpdate(
          req.params.id,
          { $set: req.body }, // Update fields dynamically
          { new: true } // Return the updated document
      );
      if (!updatedOrder) return res.status(404).json({ success: false, message: 'Order not found' });
      res.json({ data: updatedOrder, success: true, message: 'Order updated successfully' });
  } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to update order', error: err.message });
  }
});

  
// Delete Order by ID
router.delete('/order/:id', async (req, res) => {
  try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);
      if (!deletedOrder) return res.status(404).json({ success: false, message: 'Order not found' });
      res.json({ success: true, message: 'Order deleted successfully' });
  } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to delete order', error: err.message });
  }
});


 
module.exports = router;
