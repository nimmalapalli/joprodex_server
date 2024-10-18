const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const Nav=require('../models/navmodel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const {checkAdmin } = require('../middleware/check-admin'); 

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Only allow super admin to set roles
        // const role = req.body.role && req.user.role === 'superAdmin' ? req.body.role : 'user';
       
        const user = new User({
            
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: hashedPassword,
            companyname: req.body.companyname,
            // role: role,
            // acceptTerms :req.body.acceptTerms
        });

        // if (!acceptTerms) {
        //     return res.json({ success: false, message: 'You must accept the terms and conditions.' });
        //   }

        await user.save();
        res.json({ success: true, message: 'ACCOUNT CREATED SUCCESSFULLY' });
    } catch (err) {
        if (err.code === 11000) {
            return res.json({ success: false, message: 'Email Already Exists' });
        }
        console.error(err);
        res.json({ success: false, message: 'Authentication failed' });
    }
});


router.post('/login',(req,res)=>{
    
    User.find({email:req.body.email}).exec().then((result)=>{
        if(result.length<1){
         return res.json({success:false,message:'User not found'})
        }
        const user = result[0];
        bcrypt.compare(req.body.password,user.password,(err,ret)=>{
            if(ret){
                const payload={
                  userId:user._id,
                
                }
                const token=jwt.sign(payload,"webBatch")
                return res.json({success:true,token:token,message:"login successfully"})
               
            }else{
                return res.json({success:false,message:"login failed"})
            }
        })
    }).catch(err=>{
        res.json({success:false,message:'Authentication failed'})
    })
});

router.get('/profile',checkAuth,(req,res)=>{
    const userId=req.userData.userId;
User.findById(userId)
.exec()
    .then((result)=>{
        res.json({success:true,data:result})
    }).catch((err)=>{
        res.json({success:false,message:"server error"})
    })
  
});

router.put('/update/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        // If password is being updated, hash it
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        // Find the user by ID and update with new data
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});


// Forgot Password route
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user exists with the provided email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User with this email does not exist' });
        }

        // Generate a reset token and set an expiration time
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        // Save the updated user with the reset token
        await user.save();

        // Send email with reset link (use your email service configuration)
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'nimmalapallinarendra@gmail.com', // Your email
                pass: 'qraf sqaq jxvo riou' // Your email password
            }
        });

        const resetUrl = `https://mentorexpress.in/reset-password/${resetToken}`;

        const mailOptions = {
            to: user.email,
            from: 'passwordreset@yourdomain.com',
            subject: 'Password Reset Request',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            ${resetUrl}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Password reset link sent to your email' });
    } catch (err) {
        console.error('Error during forgot password process:', err);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});
router.post('/reset-password/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Find the user with the provided reset token and check if it's still valid
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() } // Token is valid only if it hasn't expired
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Password reset token is invalid or has expired' });
        }

        // Hash the new password and update the user
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined; // Clear the reset token
        user.resetPasswordExpires = undefined; // Clear the expiration time

        await user.save();

        res.json({ success: true, message: 'Password has been reset successfully' });
    } catch (err) {
        console.error('Error resetting password:', err);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Token is invalid or has expired' });
      }
  
      // Hash the new password and save it
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error });
    }
  });
//admin

// Route to get all users (Admin-only)
router.get('/admin/users', checkAuth, checkAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.json({ success: true, data: users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Route to update a user's role (Admin-only)
router.patch('/admin/users/:id', checkAuth, checkAdmin, async (req, res) => {
    const userId = req.params.id;
    const { role } = req.body; // Expect role to be provided in request body

    // Validate role
    if (!['user', 'admin', 'superAdmin'].includes(role)) {
        return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    try {
        const user = await User.findByIdAndUpdate(userId, { role: role }, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User role updated', data: user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Route to delete a user (Admin-only)
router.delete('/admin/users/:id', checkAuth, checkAdmin, async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
router.get('/allUser', async (req, res, next) => {
    try {
        const user = await User.find({});
        res.status(200).json({ data: user, message: 'Authentication login successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
router.post('/createNav',(req,res)=>{
    const nav= new Nav({
        navlist1:req.body.navlist1,
        navlist2:req.body.navlist2,
        navlist3:req.body.navlist3,
        navlist4:req.body.navlist4,
        navlist5:req.body.navlist5,
        navlist6:req.body.navlist6,
        navlist7:req.body.navlist7,
        navlist8:req.body.navlist8,
        navlist9:req.body.navlist9,
        navlist10:req.body.navlist10
      
    })
    nav.save()
    res.json({message:'created nav item successfully'})
})
router.get('/navigation',(req,res)=>{
    Nav.find({},(err,navitem)=>{
        res.json({ data: navitem, message: 'Cruds retrieved successfully' });
    })
 
})

 

module.exports =router;

