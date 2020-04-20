const express = require('express');

const app = express();

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});

app.get('/', (req, res) => {
    res.json({
        message: 'posted'
    });
});