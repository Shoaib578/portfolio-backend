const Profile = require('../models/profile')
const User = require('../models/user')
require('dotenv').config()
const {ADMIN_EMAIL,ADMIN_PASSWORD,ADMIN_NAME} = process.env

function create_admin(){
   User.countDocuments()
   .then(res=>{
   if(res < 1){
    const new_user = new User({
        email:ADMIN_EMAIL,
        password:ADMIN_PASSWORD,
        name:ADMIN_NAME
    })
    new_user.save()
    console.log("Admin created")
   

   }
   })
   .catch(err=>{
    console.log(err)

   })
   
}


function create_empty_profile(){
Profile.countDocuments()
.then(res=>{
    if(res == 0){
        let new_profile = new Profile({})
        new_profile.save()
        console.log("Profile created")
    }
})
.catch(err=>{
    console.log(err)
})
}

module.exports = {create_admin,create_empty_profile}