const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');

//set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(bodyParser.json());

// route handlers
//method = "/" route(callback function) = function(req,res)

//initialise
app.use('/api',require('./routes/api'));

//error hnadling middleware
app.use(function(err,req,res,next){
    res.status(422).send({error: err._message});
})


//listen for requests
app.listen(process.env.port||4000,function(){
    console.log("now listening for requests");
});
