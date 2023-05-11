import express from 'express'
// Handlebars (https://www.npmjs.com/package/express-handlebars)
import { engine } from 'express-handlebars'

const router=express.Router()


router.post("/userMain",(req,res)=>{
    req.session.username = req.body["username"]
    res.render('./header', {username: req.session.username})
})


router.get('/logout',(req,res)=> {
    req.session.destroy()
    res.redirect("/")
})


router.get('/userMain',(req,res) =>{
    res.render('./userMain');
}
)


router.get('/userProfile',(req,res)=> {
    res.render('./userProfile');
})


router.get('/menu',(req,res) =>{
    res.render('./menu');
})

router.get('/',(req,res) =>{
    res.render('./userStartingPage');
})


router.get('/userSignin',(req,res) =>{
    res.render('./userSignin');
})


router.get('/userRegister',(req,res) =>{
    res.render('./userRegister');
})


router.get('/userBooking',(req,res) =>{
    res.render('./userBooking');
})


export {router}

