const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja')

//method = "/" route(callback function) = function(req,res)


//get a list of ninjas from the db
router.get('/ninjas',function(req,res){
    Ninja.geoNear(
        {type:'Point',coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
        {maxDistance:1000000,spherical:true}
    ).then(function(ninjas){
        res.send(ninjas);
    });
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
//put a list of ninjas from the db

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
