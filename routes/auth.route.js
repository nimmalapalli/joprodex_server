const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const Nav=require('../models/navmodel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
var cors = require('cors');
const Otp = require('../models/Otp');


router.post('/register', cors(),async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

  
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: hashedPassword,
            companyname: req.body.companyname,
            state:req.body.state,
            role: req.body.role, // Set role here
            acceptTerms: req.body.acceptTerms
        });

        
        // Validate terms and conditions acceptance if needed
        // if (!req.body.acceptTerms) {
        //     return res.json({ success: false, message: 'You must accept the terms and conditions.' });
        // }
          // Check if the user has a verified OTP
    // const otpRecord = await Otp.findOne({ email });
    // if (!otpRecord) {
    //   return res.status(400).json({ success: false, message: 'Please verify your email first.' });
    // }
    // await Otp.deleteOne({ email });


        await user.save();
        res.json({ success: true, message: 'ACCOUNT CREATED SUCCESSFULLY' });
    } catch (err) {
        if (err.code === 11000) { // Handle duplicate email error
            return res.json({ success: false, message: 'Email Already Exists' });
        }
        console.error(err);
        res.json({ success: false, message: 'Registration failed' });
    }
});


router.post('/access/login', cors(), (req, res) => {
    User.findOne({ email: req.body.email }).exec()
        .then((user) => {
            if (!user) {
                return res.json({ success: false, message: 'User not found' });
            }

            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (isMatch) {
                    const payload = {
                        userId: user._id,
                        role: user.role // Include the user's role in the token payload
                    };

                    const token = jwt.sign(payload, "webBatch", { expiresIn: '1h' }); // Optionally set token expiration
                    return res.json({ success: true, token: token, message: "Login successfully" });
                } else {
                    return res.json({ success: false, message: "Login failed" });
                }
            });
        })
        .catch(err => {
            res.json({ success: false, message: 'Authentication failed' });
        });
});
//otp
// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nimmalapallinarendra@gmail.com',
      pass: 'qraf sqaq jxvo riou'
    }
  });
  
  // Route to generate and send OTP
  router.post('/send-otp', async (req, res) => {
    try {
      const { email } = req.body;
  
      // Generate a random 6-digit OTP
      const otp = crypto.randomInt(100000, 999999).toString();
  
      // Store OTP in MongoDB with expiration
      await Otp.create({ email, otp });
  
      // Send OTP to user's email
      const mailOptions = {
        from: 'nimmalapallinarendra@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
      };
  
      await transporter.sendMail(mailOptions);
  
      res.json({ success: true, message: 'OTP sent to your email' });
    } catch (err) {
      console.error('Error sending OTP:', err);
      res.status(500).json({ success: false, message: 'Error sending OTP' });
    }
  });
  

  
  // Route to verify OTP
  router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      // Find OTP in the database and check if it's valid
      const record = await Otp.findOne({ email, otp });
      if (record) {
        await Otp.deleteOne({ email }); // Clear OTP after successful verification
        res.json({ success: true, message: 'Email verified' });
      } else {
        res.json({ success: false, message: 'Invalid or expired OTP' });
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      res.status(500).json({ success: false, message: 'Error verifying OTP' });
    }
  });

router.get('/profile',cors(),checkAuth,(req,res)=>{
    const userId=req.userData.userId;
User.findById(userId)
.exec()
    .then((result)=>{
        res.json({success:true,data:result})
    }).catch((err)=>{
        res.json({success:false,message:"server error"})
    })
  
});

router.get('/users', cors(), async (req, res) => {
    try {
        const users = await User.find();
        res.json({ success: true, data: users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.delete('/user/:id', cors(), async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Failed to delete user' });
    }
});
router.patch('/user/block/:id', cors(), async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndUpdate(
            userId,
            { blocked: true },
            { new: true }
        );

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User blocked successfully' });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Failed to block user' });
    }
});


router.put('/update/:id',cors(), async (req, res) => {
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
router.post('/forgot-password',cors(), async (req, res) => {
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

        const resetUrl = `http://localhost:4200/reset-password/${resetToken}`;



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
router.post('/reset-password/:token',cors(), async (req, res) => {
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

router.get('/allUser',cors(), async (req, res, next) => {
    try {
        const user = await User.find({});
        res.status(200).json({ data: user, message: 'Authentication login successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
router.post('/createNav',cors(),(req,res)=>{
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

