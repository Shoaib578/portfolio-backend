const express = require('express');
const Portfolio = require('../models/portfolio')
const Education = require('../models/education')
const Skill = require('../models/skill');
const Experience = require('../models/experience');
const User = require('../models/user');
const Profile = require('../models/profile');
const fs = require('fs');
const nodemailer = require("nodemailer");

const route = express()



//PortFolio related Apis Start
route.get('/get_all_portfolios',(req,res)=>{
    
         Portfolio.find()
         .then(portfolios=>{
            return res.json({
                "status": "success",
                "data":portfolios
            })
         })
         .catch(err=>{
        console.log(err)

            return res.json({
                "status":err.message,
                "data":[]
            })
         })
       
    
})

route.get('/get_limited_portfolios',(req,res)=>{
    let limit = req.query.limit
    Portfolio.find().limit(limit)
    .then(portfolios =>{
        console.log(portfolios)
        return res.json({
            "status":"success",
            "data":portfolios
        })
    })
    .catch(err=>{
        console.log(err)
        return res.json({
            "status":err.message,
            "data":[]
        })
    })
})

route.post('/insert_portfolio',(req,res)=>{
    try{
        let picture = req.files.picture
        let title = req.body.title
        let description = req.body.description
        let category = req.body.category
        picture.mv('public/uploads/'+picture.name,function(err){
            if(err){
                console.log(err)

                return res.json({
                    "status":err.message,
                    "is_inserted":false
                   })
            }
          })
    
        let new_portfolio = new Portfolio({
            title:title,
            description:description,
            category:category,
            picture:picture.name
        })
    
       new_portfolio.save()
       return res.json({
        "status":"success",
        "is_inserted":true
       })
    }catch(err){
        console.log(err)

        return res.json({
            "status":err.message,
            "is_inserted":false
           })
    }
    
})

route.get('/delete_portfolio',(req,res)=>{
    const portfolio_id = req.query.portfolio_id
    Portfolio.findOne({_id:portfolio_id})
    .then((port)=>{
        fs.unlink('public/uploads/'+port.picture,function(result){
            console.log(result)
        })
    })
    .then(()=>{
        Portfolio.deleteMany({_id:portfolio_id})
        .then(()=>{
            return res.json({
                "status":"deleted successfully",
                "is_deleted":true
            })
        })
        .catch(err=>{
            console.log(err)
    
            return res.json({
                "status":err.message,
                "is_deleted":false
            })
        })
    })
    .catch(err=>{
        console.log(err)

        return res.json({
            "status":err.message,
            "is_deleted":false
        })
    })

   
})
//PortFolio related Apis End



//Education Related Apis Start 

route.get('/get_all_educations', (req, res)=>{
    Education.find()
    .then(educations=>{
        return res.json({
            "status":"success",
            "data":educations
        })
    })
    .catch(err=>{
        console.log(err)

        return res.json({
            "status":err.message,
            "data":[]
        })
    })
})


route.post("/insert_education",(req,res)=>{
    try{
        let title = req.body.title
        let description = req.body.description
        let date = req.body.date
        let at=req.body.at
    
        let new_education =new Education({
            title: title,
            description: description,
            at: at,
            date: date
        })
        new_education.save()
        return res.json({
            "status": "success",
            "is_inserted":true
        })
    }catch(err){
        console.log(err)

        return res.json({
            "status": err.message,
            "is_inserted":false
        })
    }
    
})


route.get('/education/delete',(req,res)=>{
    const education_id = req.query.education_id

    Education.deleteMany({_id: education_id})
    .then(()=>{
        return res.json({
            "status":"deleted successfully",
            "is_deleted":true
        })

    })
    .catch(err=>{
        console.log(err)

        return res.json({
            "status":err.message,
            "is_deleted":false
        })
    })
})
//Education Related Apis End




//Experience Related Apis Start 

route.get('/get_all_experiences', (req, res)=>{
    Experience.find()
    .then(experiences=>{
        return res.json({
            "status":"success",
            "data":experiences
        })
    })
    .catch(err=>{
        console.log(err)

        return res.json({
            "status":err.message,
            "data":[]
        })
    })
})


route.post("/insert_experience",(req,res)=>{
    try{
        let title = req.body.title
        let description = req.body.description
        let date = req.body.date
        let at=req.body.at
        console.log(date)
        let new_experience =new Experience({
            title: title,
            description: description,
            at: at,
            date: date.toString()
        })
        new_experience.save()
        return res.json({
            "status": "success",
            "is_inserted":true
        })
    }catch(err){
        console.log(err)

        return res.json({
            "status": err.message,
            "is_inserted":false
        })
    }
    
})


route.get('/experience/delete',(req,res)=>{
    const experience_id = req.query.experience_id

    Experience.deleteMany({_id: experience_id})
    .then(()=>{
        return res.json({
            "status":"deleted successfully",
            "is_deleted":true
        })

    })
    .catch(err=>{
        console.log(err)

        return res.json({
            "status":err.message,
            "is_deleted":false
        })
    })
})
//Experience Related Apis End



//Skill Related Apis Start 

route.get('/get_all_skills', (req, res)=>{
    Skill.find()
    .then(skills=>{
        return res.json({
            "status":"success",
            "data":skills
        })
    })
    .catch(err=>{
        console.log(err)

        return res.json({
            "status":err.message,
            "data":[]
        })
    })
})


route.post("/insert_skills",(req,res)=>{
    try{
        let name = req.body.name
        let expertise_level = req.body.expertise_level
        
    
        let new_skill =new Skill({
            name: name,
            expertise_level: expertise_level,
           
        })
        new_skill.save()
        return res.json({
            "status": "success",
            "is_inserted":true
        })
    }catch(err){
        console.log(err)

        return res.json({
            "status": err.message,
            "is_inserted":false
        })
    }
    
})


route.get('/skill/delete',(req,res)=>{
    const skill_id = req.query.skill_id

    Skill.deleteMany({_id: skill_id})
    .then(()=>{
        return res.json({
            "status":"deleted successfully",
            "is_deleted":true
        })

    })
    .catch(err=>{
        console.log(err)

        return res.json({
            "status":err.message,
            "is_deleted":false
        })
    })
})
//Skill Related Apis End



//User Related Apis Start 

route.get('/get_all_users', (req, res)=>{
    User.find()
    .then(users=>{
        return res.json({
            "status":"success",
            "data":users
        })
    })
    .catch(err=>{
        console.log(err)

        return res.json({
            "status":err.message,
            "data":[]
        })
    })
})

route.get('/get_user_by_id', (req, res)=>{
    let user_id = req.query.user_id
    let details = {
        email:'',
        password:'',
        name:''
    }
    User.findOne({_id:user_id})
    .then(user=>{
        if(user){
            details.email = user.email
            details.password = user.password
            details.name = user.name
        }
        return res.json({
            "status":"success",
            "data":details
        })
    })
    .catch(err=>{
        console.log(err)

        return res.json({
            "status":err.message,
            "data":details
        })
    })
})


route.post("/register_user",(req,res)=>{
    try{
        let name = req.body.name
        let email = req.body.email
        let password = req.body.password
        
        User.findOne({email:email})
        .then(user=>{
            if(user){
                return res.json({
                    "status": "Email Already Exists",
                    "is_inserted":false
                })
            }else{
                let new_user =new User({
                    name: name,
                    email: email,
                    password: password
                   
                })
                new_user.save()
                return res.json({
                    "status": "success",
                    "is_inserted":true
                })
            }
        })
    
       
    }catch(err){
        console.log(err)
        return res.json({
            "status": err.message,
            "is_inserted":false
        })
    }
    
})


route.post('/login_user',(req,res)=>{
    let email = req.body.email
    let password = req.body.password

    User.findOne({email: email})
    .then(user=>{
        if(user && user.password == password){
            return res.json({
                "status":"logged in successfully",
                "is_logged_in":true,
                "user":user
            })

        }else{
            return res.json({
                "status":"Invalid Email or Password",
                "is_logged_in":false
            })
        }
    })
    .catch(err=>{
        console.log(err)
    })
})




route.post('/reset_password',async(req,res)=>{
    let checked_email = req.body.checkd_email
    let email = req.body.email

    if(checked_email == false){
        User.findOne({ email: email})
        .then(user=>{
            if(user){
                return res.json({
                    "status":"success",
                    "found":true
                })
            }
        })
        .catch(err=>{
            return res.json({
                "status":err.message,
                "found":false

                
            })
        })
    }else{
        let password = req.body.password
      await  User.updateMany({email:email},{
            $set:{
                password:password
            }
        })
        .then(()=>{
            return res.json({
                "status":"updated successfully",
                "is_updated":true
                
            })
        })
        .catch(err=>{
            return res.json({
                "status":err.message,
                "is_updated":false
                
            })
        })
    }
})


route.get('/user/delete',(req,res)=>{
    const user_id = req.query.user_id

    User.deleteMany({_id: user_id})
    .then(()=>{
        return res.json({
            "status":"deleted successfully",
            "is_deleted":true
        })

    })
    .catch(err=>{
        return res.json({
            "status":err.message,
            "is_deleted":false
        })
    })
})

route.post('/user/update',(req,res)=>{
    const user_id = req.body.user_id
    let email = req.body.email
    let password = req.body.password
    let name = req.body.name
    let updateDoc = {
        email:email,
        name:name,
        password:password
    }



    User.updateMany({_id:user_id},{
        $set:updateDoc
    })
    .then(()=>{
        return res.json({
            "status":"success",
            "is_updated":true
        })
    })
    .catch(err=>{
        return res.json({
            "status":err.message,
            "is_updated":false
        })
    })
})
//Skill Related Apis End


route.get('/get_profile_info',(req,res)=>{
    let data ={
        email:'',
        name:'',
        title:'',
        description:'',
        profile_id:'',
        twitter:'',
        facebook:'',
        linked_in:'',
        profile_image:'',
        live_in:'',
        gender:'',
        cv_file:'',
        age:''
    }
    Profile.find()
    .then(profile=>{
        console.log(profile)
        if(profile.length>0){
            data.email = profile[0].email
            data.name = profile[0].name
            data.description = profile[0].description
            data.live_in = profile[0].live_in
            data.profile_image = profile[0].profile_image
            data.gender = profile[0].gender
            data.age = profile[0].age
            data.title = profile[0].title
            data.profile_id = profile[0]._id
            data.cv_file = profile[0].cv_file
            data.facebook = profile[0].facebook
            data.twitter = profile[0].twitter
            data.linked_in = profile[0].linked_in
        }
        return res.json({
            "status":"success",
            "data":data
        })
    })
    .catch(err=>{
        return res.json({
            "status":err.message,
            "data":[]
        })
    })
})



route.post('/update_profile',(req,res)=>{
    let updateDocs = {}
    let name = req.body.name
    let email = req.body.email
    let title = req.body.title
    let description = req.body.description
    let gender = req.body.gender
    let age = req.body.age
    let live_in = req.body.live_in
    let facebook = req.body.facebook
    let twitter = req.body.twitter
    let linked_in = req.body.linked_in
    console.log(age)
   
    if(name != 'undefined'){
        updateDocs.name = name
    }else{
        updateDocs.name = ''

    }


    if(email != 'undefined'){
        updateDocs.email = email

    }else{
        updateDocs.email = ''

    }



     if(title != 'undefined'){
        updateDocs.title = title
    }else{
        updateDocs.title = ''

    }


    if(twitter != 'undefined'){
        updateDocs.twitter = twitter
    }else{
        updateDocs.twitter = ''

    }


    if(facebook != 'undefined'){
        updateDocs.facebook = facebook
    }else{
        updateDocs.facebook = ''

    }


    
    if(linked_in != 'undefined'){
        updateDocs.linked_in = linked_in
    }else{
        updateDocs.linked_in = ''

    }

    if(description != 'undefined'){
        updateDocs.description = description
    }else{
        updateDocs.description = ''

    } 


    if(age != undefined){
        updateDocs.age = age
    }else{
        updateDocs.age = 0

    }


    if(live_in != 'undefined'){
        updateDocs.live_in = live_in
    }else{
        updateDocs.live_in = ''

    } 


    if(gender != 'undefined'){
        updateDocs.gender = gender
    }else{
        updateDocs.gender = ''

    }

    if(req.files){
        let cv_file = req.files.cv_file
        if(cv_file){
            cv_file.mv('public/uploads/'+cv_file.name,function(err){
                if(err){
                    return res.json({
                        "status":err.message,
                        "is_updated":false
                       })
                }
              })
            updateDocs.cv_file = cv_file.name
        }
      
    }
     if(req.files){
        let profile_image = req.files.profile_image 
        if(profile_image){
            profile_image.mv('public/uploads/'+profile_image.name,function(err){
                if(err){
                    return res.json({
                        "status":err.message,
                        "is_updated":false
                    })
                }
              })
            updateDocs.profile_image = profile_image.name
        }
        
    }





    Profile.updateMany({_id:req.body.profile_id},{
        $set:updateDocs
    })
    .then(()=>{
        return res.json({
            "status":"Profile Update Successfully",
            "is_updated":true
        })
    })
    .catch(err=>{
        return res.json({
            "status":err.message,
            "is_updated":false
        })
    })
})



module.exports  = route