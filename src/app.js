const express = require('express');
const app = express();

//Just moungting the routes
const roomRoutes = require('../src/routes/room.routes');
app.use('/api/rooms',roomRoutes);

module.exports = app;