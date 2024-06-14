// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Replace these email addresses with your own
    const to = "bloc2.0@hotmail.com";
    const adminEmail = "xideleventh@outlook.com";

    // Send email to recipient
    sendEmail(to, `New message from ${name}`, `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`);

    // Send auto-response to the sender
    sendEmail(email, "Thank you for contacting us!", `Dear ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nXI SOLUTIONS`);

    // Send notification to the admin
    sendEmail(adminEmail, `New message from ${name}`, `You have received a new message from ${name} (${email}):\n\n${message}`);

    // Redirect to a thank you page
    res.redirect('https://xiport.vercel.app/thank.html');
});

// Function to send emails using Nodemailer
async function sendEmail(to, subject, body) {
    try {
        // Create a Nodemailer transporter
        let transporter = nodemailer.createTransport({
            // Provide your SMTP details here
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'bloc2.0@hotmail.com', // Your email
                pass: 'ConstantineDgreat1' // Your password
            }
        });

        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'bloc2.0@hotmail.com', // Sender address
            to: to, // List of recipients
            subject: subject, // Subject line
            text: body // Plain text body
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error occurred while sending email:", error);
    }
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
