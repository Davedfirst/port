const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle POST requests from the HTML form
app.post('/send_email', async (req, res) => {
    const { subject, message, receiverEmail } = req.body;

    // Replace with your email service API endpoint and API key
    const apiKey = 'pubkey-b3e947e21e8f816e578b761cec9305d3';  // Replace with your email service API key
    const apiUrl = 'https://d8c44475a7c20a90d87f5899aedce910';

    try {
        // Send email using third-party service API
        const response = await axios.post(apiUrl, {
            apiKey: pubkey-b3e947e21e8f816e578b761cec9305d3,
            senderEmail: 'pholaxi@gmail.com',
            receiverEmail: receiverEmail,
            subject: subject,
            message: message
        });

        console.log('Email sent successfully:', response.data);
        res.json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).json({ error: 'Failed to send email.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
