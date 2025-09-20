// Import Packages
const dotenv = require('dotenv');
const express = require('express');
const nodemailer = require('nodemailer');


// Load environment variables from .env file
dotenv.config();


// Initialize Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER ,
        pass: process.env.EMAIL_PASS
    }
});


// Custom Middleware
const port = process.env.PORT;
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views', './views');

// Objects
const services = [
    {title: "Ticketing And Reservations", img: "services1.jpg"},
    {title: "Visa Bookings", img : "services2.jpg"},
    {title: "Logistics Management", img : "services3.jpg"},
    {title: "Meet And Greet Services", img : "services4.jpg"},
    {title: "Immigration Consultancy/Advisory Services", img : "services5.jpg"},    
    {title : "Project Management", img : "Human Resources Consultancy", img : "services6.jpg"}
]

// Define Routes

// Favicon.ico
app.get('/favicon.ico', (req,res) => {
    res.status(204).end()
});
// Homepage
app.get("/", (req,res) => {
    res.render(`index`, {services} )
});

// About Us
app.get("/about-us", (req,res) => {
    res.redirect('/#aboutUs', {services})
})

app.get("/services", (req,res) => {
    res.redirect('/#services')
})
app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;
    const messageOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New message from ${name}`,
        text: `You have received a new message from ${name} (${email}):\n\n${message}`
    };
    transporter.sendMail(messageOptions, (error, info) => {
        if (error) {
            return res.status(500).json({success: false, message : 'Error sending email'});
        }
        console.log('Email sent:', info.response);
        res.status(200).json({success : true ,message: 'Email sent successfully'});
        res.redirect('/')
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});