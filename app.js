const express = require('express');
const mongoose = require('mongoose');

const app = express();

require("dotenv").config();
const cors = require('cors')

const authRoute = require('./routes/auth.route');
const router = require('./routes/router');

const shipmentRoute = require('./routes/shipmentRoute');
const paymentRoute = require('./routes/paymentRoute');     
const bodyParser = require('body-parser');

const fileUpload = require('express-fileupload');

const port = process.env.PORT || 8080;

const nimbus =require('./routes/nimbuspost.js')
const fedex =require('./routes/fedex.js')
const warehouse=require('./routes/warehouse.route.js');
const contactForm = require('./routes/staticwebsiteRoutes/contact.route.js')

const hubRoutes=require('./routes/hubRoutes.js')

const uploadRoutes= require('./routes/upload.route.js')

const uri =  `mongodb+srv://snvitsolutions5:4CNhVx3Lp9rZ0NS8@cluster0.2smu8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true`

// `mongodb://localhost:27017`

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  });
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Error connecting to MongoDB Atlas with Mongoose:', error);
});
db.once('open', () => {
  console.log('Connected to MongoDB Atlas with Mongoose');
});



app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({ createParentPath: true }));
app.use(express.json());

app.use(express. urlencoded({extended:false}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 next();
});



app.use('/api', authRoute);
app.use('/api', router);
app.use('/api', shipmentRoute);
app.use('/api',paymentRoute);
app.use('/api',nimbus)
app.use('/api',fedex);
app.use('/api',warehouse);
app.use('/api',contactForm);
app.use('/api', hubRoutes);
app.use('/api', uploadRoutes);

 app.get('/',(req,res)=>{
  res.send('welcome')
 });





//Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});