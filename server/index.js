const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());


app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});

app.get('/', (req, res) => {
    res.json({
        message: 'posted !!!!!'
    });
});


function isVAlidComment(comment) {
    return comment.name && comment.name.toString().trim() !== '' &&
        comment.content && comment.content.toString().trim() !== '';
}

app.post('/mytwitter', (req, res) => {
    if (isVAlidComment(req.body)) {
        const comment = {
            name: req.body.name.toString(),
            content: req.body.content.toString()

        };
        console.log(comment);
    } else {
        res.status(422);
        res.json({
            message: "name and content are required"
        });
    }
});