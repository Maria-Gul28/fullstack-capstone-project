// Import required libraries
const express = require('express');
const natural = require('natural');  // Import the Natural library

// Initialize the Express app
const app = express();

// Set up the server to accept JSON
app.use(express.json());

// Create the POST /sentiment endpoint
app.post('/sentiment', (req, res) => {
    try {
        // Task 4: Extract the sentence parameter from the request body
        const { sentence } = req.body;

        // Ensure the sentence exists and is a string
        if (!sentence || typeof sentence !== 'string') {
            return res.status(400).json({ error: 'Please provide a valid sentence as input.' });
        }

        // Task 5: Process the sentiment analysis
        const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
        const sentimentScore = analyzer.getSentiment(sentence.split(' '));  // Split sentence into words

        // Task 5: Determine the sentiment based on the sentiment score
        let sentiment = 'neutral';
        if (sentimentScore < 0) {
            sentiment = 'negative';
        } else if (sentimentScore > 0.33) {
            sentiment = 'positive';
        }

        // Task 6: Return the success response
        res.status(200).json({ sentimentScore, sentiment });
    } catch (error) {
        // Task 7: Handle errors and return error state
        res.status(500).json({ error: 'An error occurred during sentiment analysis.' });
    }
});

// Start the server on port 3000 (or any desired port)
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
