// Declarations
// Express npm require
const express = require('express');
// ↓file system and path requires
const fs = require('fs');
const path = require('path');
// Express app
const app = express();
// PORT
const PORT = process.env.PORT || 3000;
// ↓Requiring routers for express app.
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// ↓.use statements for data parsing.
// Express middleware
app.use(express.urlencodedParser({
    extended: true,
}));
// Static files
app.use(express.static('public'));
app.use(express.json());

// ↓.use statements to connect to connect Routes and app.
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Server listener
app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}...`);
});
