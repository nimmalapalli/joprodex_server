const router = require('express').Router();
const userContact= require('../../models/usercontactModel.js');
const cors = require('cors');
const nodemailer = require('nodemailer');

router.post('/userContactForm', cors(), async (req, res) => {
    const { type, name, email, message } = req.body;

    try {
        if (type === 'contact-form') {
            // Handle contact form submission
            const usercontact = new userContact({
                name,
                email,
                message
            });

            // Save contact form details to the database
            await usercontact.save();

            // Send email with contact information
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'nimmalapallinarendra@gmail.com', // Your email
                    pass: 'qraf sqaq jxvo riou' // Your email password or app password
                }
            });

            const mailOptions = {
                to: 'Shekhar@joprodex.com', // Email address to receive contact form details
                from: `${email}`, // Same as the sender's email
                subject: 'New Contact Form Submission',
                text: `You have received a new message from the contact form.\n\n` +
                      `Name: ${name}\n` +
                      `Email: ${email}\n` +
                      `Message: ${message}\n`
            };

            await transporter.sendMail(mailOptions);
            return res.json({ success: true, message: 'Contact form submitted successfully and email sent.' });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid request type' });
        }
    } catch (err) {
        console.error('Error during request handling:', err);
        if (err.code === 11000) {
            return res.json({ success: false, message: 'Email already contacted' });
        }
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});


module.exports =router;