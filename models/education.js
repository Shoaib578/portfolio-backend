const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const EducationSchema = new Schema({
   
    
    education_id:{
      type:Schema.ObjectId,
      
    },
   
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
  
  const Education = mongoose.model('Education', EducationSchema);
  
  module.exports = Education;