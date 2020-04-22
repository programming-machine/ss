const express = require('express');
const cors = require('cors');
const monk = require('monk');




const app = express();
const db = monk('localhost/mytwitter');
const comments = db.get('perCom');

app.use(cors());
app.use(express.json());


app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});

app.get('/', (req, res) => {
    res.json({
        message: 'posted '
    });
});

app.get('/mytwitter', (req, res) => {
    comments
        .find()
        .then(comments => {
            res.json(comments);
        });

});


function isVAlidComment(comment) {
    return comment.name && comment.name.toString().trim() !== '' &&
        comment.content && comment.content.toString().trim() !== '';
}

app.post('/mytwitter', (req, res) => {

    console.log(req.body);
    if (isVAlidComment(req.body)) {
        const comment = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        };
        comments
            .insert(comment)
            .then(createdComment => {
                res.json(createdComment);

            });
        console.log(comment);
    } else {
        res.status(422);
        res.json({
            message: "name and content are required"
        });
    }
});