const express = require('express');
const passport = require('passport');
const route = express.Router();

route.get('/login',(req,res)=>{
    res.render('login' , {user:req.user});
})

route.get('/logout',(req,res)=>{
    req.logout(); //logout the user
    res.redirect('/');
})

//auth with google
route.get('/google', passport.authenticate('google',{  //google means it will activate google strategy to authenticate someone and its going to redirect them to the google consent screen
    scope : ['profile'] //scope is for what we want from user
}))

//callback route for google to redirect to
route.get('/google/redirect', passport.authenticate('google'),(req,res)=>{ //here we have write passport.authenticate('google')  is to grab information(we get information in terms of code in url) from google and firstly callback function of passport setup is fire(see diagram in ss)
    //res.send(req.user);  //req.user is the currently logged in user, passport does all this for us behind the scene when it goes to passport-setup , it attach the user to req object

    res.redirect('/profile');
})

module.exports = route;