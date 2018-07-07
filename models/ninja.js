const mongoose = require('mongoose');
//adds a layer of methods to easily save,edit,retriev and delete data from mongodb
//allows us to create our models and schemas easily
const Schema = mongoose.Schema;
//models represent collections in mmongodb
//schema defines the strusture of database

  const GeoSchema = new Schema({
      type:{
          type:String,
          default:"Point"
      },
      coordinates:{
          type:[Number],
          index:"2dsphere"
      }
  });
//create ninja schema & model
const NinjaSchema =new Schema({
    name:{
        type:String,
        required:[true,'Name field is required']
    },
    rank:{
        type:String
    },
    available:{
        type:Boolean,
        default:false
    },
    //add in geo loacation
    geometry:GeoSchema    
});

const Ninja = mongoose.model('ninja',NinjaSchema);
//it will convert ninja to ninjas
module.exports = Ninja;