import express = require('express');
let app = express();

var data = [
    {id: 1, author: "Clifton Craig", text: "This is the bees knees!"},
    {id: 2, author: "Michael Hart", text: "Use the *CQRS* pattern!"},
    {id: 3, author: "Milton Waid", text: "Hi Clifton."}
];

app.use(express.static('www'));
app.get('/api/comments', function (req, res) {
    console.log("request received");
    res.send(data);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});