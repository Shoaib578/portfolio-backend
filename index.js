const express = require('express')
const app = express()
const cors = require('cors')
const upload = require('express-fileupload')
app.use(upload())
app.use(express.json())
app.use(cors())
require('dotenv').config()
app.use(express.static('public'))
const database = require('./config/database')
const nodemailer = require("nodemailer");

database.connect()


async function send_email(from,subject,body,name,response){
  console.log(from)
    const transporter = await nodemailer.createTransport({
       host:'smtp.gmail.com',
       service:"gmail",
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });
      transporter.verify().then(console.log).catch(console.error);


      transporter.sendMail({
        from: {
          name:name,
          address:from
        }, // sender address
        
        bcc: [
          from,
          {
              name: name,
              address: from
          }
      ],
        to: process.env.NODEMAILER_EMAIL, // list of receivers
        subject: subject, // Subject line
        html:`
        <b>Sender Name: ${name}</b>
        <br/>
        <b>Sender Email : ${from}</b>
        <br />
        <br />

        <b>Message</b>
        <br />
        <p>${body}</p>
        `,
       
        
      
      
      }).then(info => {
       return response.send({
          "sent":true
        })
      }).catch(err=>{
        console.log(err)
        return response.send({
          "sent":false
        })
      });
}




const apis = require('./routes/apis')
app.use('/apis',apis)

app.post('/contact',async(req,res)=>{
let from = req.body.from
let subject = req.body.subject
let body = req.body.body
let name = req.body.name
await send_email(from,subject,body,name,res)

})

let port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
