// Create router instance
const express = require('express');
const router = express.Router();

// Import room model (rooms map)
const { rooms } = require('../models/room.model');

router.get('/', (req,res) => {
    res.json({
        success: true,
        rooms: Array.from(rooms.keys())
    });
});  

router.get('/hello',(req,res) => {
    res.json({
        success: true,
        rooms: Array.from(rooms.keys()),
        message: "Radha Radha",

    });
});

module.exports = router;