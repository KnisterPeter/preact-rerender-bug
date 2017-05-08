const path = require('path');
const express = require('express');
const compression = require('compression');

// Setup express.js with gzip compression
const app = express();
app.use(compression());
app.use(express.static(path.join(__dirname)));

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});
