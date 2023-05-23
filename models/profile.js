const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ProfileSchema = new Schema({
   
    
    
   
    name:{
      type:String,
    },
    title:{
        type:String,
    },
    profile_image:{
        type:String,
    },
    cv_file:{
        type:String,
    },
    email:{
        type:String,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
    },
    description:{
        type:String,
    },
    
    live_in:{
        type:String,
    },
    linked_in:{
        type:String
    },
    facebook:{
        type:String
    },
    twitter:{
        type:String
    }
    

    
  
  }, {
    timestamps: true,
  });
  
  const Profile = mongoose.model('Profile', ProfileSchema);
  
  module.exports = Profile;