const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const PortfolioSchema = new Schema({
   
    
    
    picture:{
      type:String
    },
    title:{
      type:String,
    },
    category:{
        type:String,
      },
    description:{
        type:String,
    }
    
  
  }, {
    timestamps: true,
  });
  
  const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
  
  module.exports = Portfolio;