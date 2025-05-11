const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db');
const router = express.Router();
const dotenv = require('dotenv');
const pino = require('pino');  // Import Pino logger
dotenv.config();
const logger = pino();  // Create a Pino logger instance

// Create JWT secret
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
    console.log("\n\n Inside login")
    try {
        // Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`.
        const db = await connectToDatabase();
        const collection = db.collection("users");

        // Check for user credentials in the database
        const theUser = await collection.findOne({ email: req.body.email });
        
        // Check if the user exists
        if (theUser) {
            // Check if the password matches the encrypted password
            let result = await bcryptjs.compare(req.body.password, theUser.password);
            
            if (!result) {
                logger.error('Passwords do not match');
                return res.status(404).json({ error: 'Wrong password' });
            }
            
            // Fetch user details from the database
            const userName = theUser.firstName;
            const userEmail = theUser.email;
            
            // Create JWT authentication if passwords match with user._id as payload
            let payload = {
                user: {
                    id: theUser._id.toString(),
                },
            };

            const authtoken = jwt.sign(payload, JWT_SECRET);
            logger.info('User logged in successfully');
            
            // Send the response with the JWT token and user details
            return res.status(200).json({ authtoken, userName, userEmail });
        } else {
            // Send message if user not found
            logger.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (e) {
        logger.error(e);
        return res.status(500).json({ error: 'Internal server error', details: e.message });
    }
});

module.exports = router;
