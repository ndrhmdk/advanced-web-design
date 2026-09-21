const express = require('express');
const router = express.Router();

// define route for user
router.get('/', (req, res) => {
    res.send('User List');
});

module.exports = router;