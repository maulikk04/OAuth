const express = require('express');
const route = express.Router();

const authcheck = (req,res,next)=>{
    if(req.user)
    {
        //if user is logged in then move to next middleware, here it will move to res.send
        next();
    }
    else
    {
        res.redirect('/auth/login');
    }
}

route.get('/',authcheck, (req,res)=>{
    // res.send('Username of logged in user ' + req.user.username);

    res.render('profile',{user:req.user}); //passing user to profile, we can access it in ejs by name user
})

module.exports = route;