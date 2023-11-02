// Create web server
// 1. create server
// 2. create router
// 3. create route
// 4. listen port

const express = require('express');
const app = express();

// 2. create router
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/comments', (req, res) => {
    res.send([1, 2, 3]);
});

app.get('/api/comments/:id', (req, res) => {
    res.send(req.params.id);
});

// 3. create route
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));