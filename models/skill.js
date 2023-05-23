const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const SkillSchema = new Schema({
   

   
    name:{
      type:String,
    },
    expertise_level:{
        type:Number,
      }
    
  
  }, {
    timestamps: true,
  });
  
  const Skill = mongoose.model('Skill', SkillSchema);
  
  module.exports = Skill;