// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

// what happens on a POST request to /api/users
server.post('/api/users', (req/*incoming*/, res/*outgoing*/) => {

});

//GET request to /api/users
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({
            error: "The users information could not be retrieved."
        })
    })
    

});
//GET request to /api/users/:id
//DELETE request to /api/users/:id
//PUT request to /api/users/:id



//should be the last step 
server.listen(4000, () => {
    console.log('server is running on port 4000');
}); 