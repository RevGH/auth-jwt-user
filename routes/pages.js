const express = require('express');
const router = express.Router();        // Här skapar vi en instans av 'Router'
const path = require('path');       // Inbyggd core module.

router.get('/batcave', (req, res) => {      // Endpoint för 'batcave'
    res.sendFile(path.resolve('public/batcave.chtml'));     // Här skickar vi batcave.html frontend.
});

module.exports = router;