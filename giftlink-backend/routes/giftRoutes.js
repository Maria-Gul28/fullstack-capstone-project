import express from 'express';
import connectToDatabase from '../models/db.js';

const router = express.Router();

// GET all gifts
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gifts = await collection.find().toArray();
        res.json(gifts);
    } catch (e) {
        console.error('Error fetching gifts:', e);
        res.status(500).send('Error fetching gifts');
    }
});

// GET a gift by ID
router.get('/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const id = req.params.id;
        const gift = await collection.findOne({ id: id });

        if (!gift) {
            return res.status(404).send('Gift not found');
        }

        res.json(gift);
    } catch (e) {
        console.error('Error fetching gift:', e);
        res.status(500).send('Error fetching gift');
    }
});

// POST a new gift
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const result = await collection.insertOne(req.body);
        res.status(201).json(result.ops ? result.ops[0] : req.body);
    } catch (e) {
        next(e);
    }
});

export default router;
