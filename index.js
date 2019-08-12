// implement your API here

//libraries
const express = require('express');

//other files
const db = require('./data/db.js');

//global objects
const server = express();

//middleware that allows to define newUser by parsing body
server.use(express.json());

// what happens on a POST request to /api/users
server.post('/api/users', (req/*incoming*/, res/*outgoing*/) => {
    const newUser = req.body;
    db.insert(newUser)
        .then(user => {
          res.status(201).json(user);  
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                errMessage: "There was an error while saving the user to the database"
            })
        })
});

//GET request to /api/users
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            errMessage: "The users information could not be retrieved."
        })
    })
    

});
//GET request to /api/users/:id
server.get('api/users/:id', (req, res) => {

})
//DELETE request to /api/users/:id
//PUT request to /api/users/:id



//should be the last step 
server.listen(4000, () => {
    console.log('server is running on port 4000');
}); 