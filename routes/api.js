const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');




//get a list of ninjas from the db
router.get('/ninjas', function(req, res, next){
    Ninja.aggregate().near({
        near: {
            'type': 'Point',
            'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 100000,
        spherical: true,
        distanceField: 'dis'
    }).then(ninjas => res.send(ninjas)).catch(next);;
})

// add a new ninja to the db
// we receive a post request where someone is going to attach some JSON data
// to the body of that request
// that JSON data is going to represent a new ninja with these different properties: name, rank and availability
// once we receive it we're going to say ninja create - this is a mongoose method and this is the model so we're calling this create method on the model which is goijg to create a new instance of a ninja using the data that we receive from the body of the request
// it's going to save that datato the db for us and this is going to wait until the action is complete
// once it is, is going to research what the ninja has saved to the db
// then the function is going to fire with the response with that ninja
// this send back the JSON to the user - so that it knows everything has been successful

//post a list of ninjas from the db
router.post('/ninjas',function(req,res,next){
    // console.log(req.body);
    //a new instance of ninja is created with with data sent from req body
    // var ninja = new Ninja(req.body);
    // ninja.save();  ALTERNATIVE
    Ninja.create(req.body).then(function(ninja){  //create instance and saves the data in ninjas database
        res.send(ninja);
    }).catch(next);        
    
});

//update a list of ninjas from the db
router.put('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
        });
    }).catch(next);
})
//Delete a list of ninjas from the db

router.delete('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    }).catch(next);
});

module.exports = router;


//method = "/" route(callback function) = function(req,res)