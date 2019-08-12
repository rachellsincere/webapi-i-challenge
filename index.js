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
    const { id } = req.params;

    db.findById(id)
    .then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                errMessage: "The user with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            errMessage: "The user information could not be retrieved." 
        })
    })
})

//DELETE request to /api/users/:id
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params; //always defined. no need for middleware

    db.remove(id)
        .then(deletedUser => {
            if (deletedUser) {
                res.json(deletedUser);
            } else {
                res.status(404).json({
                    errMessage: "The user with the specified ID does not exist." 
                })
            }   
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                errMessage: "The user could not be removed"
            })
        })
})

//PUT request to /api/users/:id
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.update(id, changes)
        .then(updated => {
            if (updated) {
                res.json(updated);
            } else {
                res.status(404).json({
                    errMessage: "The user with the specified ID does not exist." 
                })
            }
        })
        .catch(err => {
            res.status().json({
                err: err,
                errMessage: "The user information could not be modified." 
            })
        })
})


//should be the last step 
server.listen(4000, () => {
    console.log('server is running on port 4000');
}); 