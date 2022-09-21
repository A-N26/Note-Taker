// Declarations
// Express npm require
const express = require('express');
// Express app
const app = express();
// PORT
const PORT = process.env.PORT || 3000;
// ↓Requiring routers for express app.
const apiRoutes = require('../routes/apiRoutes');
const htmlRoutes = require('../routes/htmlRoutes');

// ↓.use statements for data parsing.
// Express middleware
app.use(express.urlencoded({
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
    console.log(`Server is running on port ${PORT}...`);
});
