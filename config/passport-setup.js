const passport = require('passport');
const googlestrategy = require('passport-google-oauth20');
const keys = require('./keys');
const model = require('../model/usermodel');

//serializeuser take that user from the callback function and grab some info from it so we can stuff it in a cookie.
passport.serializeUser((user,done)=>{
    done(null,user._id); // first parameter is for error
        //we are going to attach this user._id to cookie then cookiesession is gonna encrypt that cookie and send it to the browser
})
//done takes us to the next stage
//deserializeUser comes back to us from the browser take that id that's stored in it, so here we pass only id 
passport.deserializeUser( async (id,done)=>{
    try {
        const user = await model.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
    
})

passport.use(new googlestrategy({
    callbackURL: '/auth/google/redirect',  //this same url we have set in credentials
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
},
    async (accessToken, refreshToken, profile, done) => { //access token is a token we recieve from google so that if we want to go back and say alter user profile, going to mailbox read the email we can use access token to do that becoz we got it from google , refreshToken is to refresh accesstoken because it expires after certain amount of time
        //profile is the information that passport comesback with when it takes code to google and brings the profile information , it is bringing back right here, done is a function call which we need to call when we are done with callback function
        
        //passport callback function

        // console.log('passport callback function fires ');
        //console.log(profile);

        //check is user is already in db
        const currentuser = await model.findOne({ googleid: profile.id });
        if (currentuser) {
            console.log(currentuser);
            done(null,currentuser); //when done method is called it takes to the serializeduser where currentuser is passed as user.
        }
        else {
            new model({
                username: profile.displayName,
                googleid: profile.id,
                thumbnail: profile._json.picture     //it is for user image, user image url is in json , check by console.log(profile);
            }).save().then((user) => {   //.save is async function and it return promise, user contain data which is stored in db
                console.log(user);
                done(null,user);
            })

        }

    })
);