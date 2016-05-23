import express = require('express');
import bodyParser = require('body-parser');
let app = express();

var data = [
    {id: 1, author: "Clifton Craig", text: "This is the bees knees!"},
    {id: 2, author: "Michael Hart", text: "Use the *CQRS* pattern!"},
    {id: 3, author: "Milton Waid", text: "Hi Clifton."}
];

//Serve static files from www
app.use(express.static('www'));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/comments', function (req, res) {
    console.log("request received");
    res.send(data);
});

app.post('/api/comments', function (req, res) {
    console.log("POST received: ", req.body);
    var newComment = {id:data.length+1, author: req.body.author, text:req.body.text};
    console.log("update received: ", newComment);
    data.push(newComment);
    res.send(data);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});