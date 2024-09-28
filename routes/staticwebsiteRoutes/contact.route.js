const router = require('express').Router();
const userContact= require('../../models/usercontactModel.js')
router.post('/userContactForm', async (req, res) => {
    try {
     
    
        const usercontact = new userContact({
            
            name: req.body.name,
            email: req.body.email,
            message:req.body.message
          
        });


        await usercontact.save();
        res.json({ success: true, message: 'Conctect Form sended Successfully' });
    } catch (err) {
        if (err.code === 11000) {
            return res.json({ success: false, message: 'Email Already contacted' });
        }
        console.error(err);
        res.json({ success: false, message: 'ContactForm send failed' });
    }
});


module.exports =router;