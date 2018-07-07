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
    }).then(ninjas => res.send(ninjas));
});

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
router.put('/ninjas/:id',function(req,res,next){
    Ninja.findByIdAndUpdate({_id:req.params.id},req.body).then(function(ninja){
        res.send(ninja);  
    })
});
//Delete a list of ninjas from the db

router.delete('/ninjas/:id',function(req,res,next){
    Ninja.findByIdAndRemove({_id:req.params.id}).then(function(){
        Ninja.findOne({_id:req.params.id}).then(function(ninja){
        res.send(ninja);
        });
    });
});

module.exports = router;


//method = "/" route(callback function) = function(req,res)