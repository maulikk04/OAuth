const express = require('express');
const authroutes = require('./routes/authroutes')
const passportSetup = require('./config/passport-setup');  //now our passport strategy is running in background and now it will know what google strategy is and it will show consent screen
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookiesession = require('cookie-session');
const passport = require('passport');
const profileroutes = require('./routes/profileroutes');

const app = express();

app.use(express.static('public'));
app.set('view engine','ejs');
mongoose.connect(keys.mongodb.dbUri,{useNewUrlParser : true , useUnifiedTopology : true});

app.use(cookiesession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookiekey]  //key is use to encrypt the cookie when it is send to the browser 
}))

//initialize passport
app.use(passport.initialize());
app.use(passport.session()); //passport.session to control or login in, we use session cookie
app.get('/',(req,res)=>{
    res.render('home' , {user:req.user});
})
app.use('/auth',authroutes);
app.use('/profile',profileroutes);
app.listen(3000,()=>{
    console.log('app listening on port 3000');
})
