const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ExpreienceSchema = new Schema({
   
  
   
    title:{
      type:String,
    },
    at:{
        type:String,
      },
      date:{
        type:String,
      },
      description:{
        type:String,
      }
  
  
  }, {
    timestamps: true,
  });
  
  const Experience = mongoose.model('Experience', ExpreienceSchema);
  
  module.exports = Experience;