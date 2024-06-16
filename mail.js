// api/send_email.js

const nodemailer = require('nodemailer');

// Configure nodemailer with Gmail SMTP settings
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cpaboob@gmail.com', // Your Gmail address
        pass: 'CPANOOB21' // Your Gmail password or App Password
    }
});

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Email content and options
        const mailOptions = {
            from: 'cpaboob@gmail.com',
            to: 'xideleventh@outlook.com', // Destination email address
            subject: 'New Message from Contact Form',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        try {
            // Send email using Gmail SMTP
            await transporter.sendMail(mailOptions);

            // Send automatic confirmation email to submitted email address
            const confirmOptions = {
                from: 'cpaboob@gmail.com',
                to: email,
                subject: 'Thank you for your message',
                text: 'This is an automatic confirmation that we have received your message. We will get back to you soon.'
            };

            await transporter.sendMail(confirmOptions);

            console.log('Email sent successfully');
            res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
            console.error('Failed to send email:', error);
            res.status(500).json({ error: 'Failed to send email.' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};
