const passport=require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
passport.serializeUser(function(user, done) {
 done(null, user);
});
passport.deserializeUser(function(user, done) {
 done(null, user);
});
passport.use(new GoogleStrategy({
 clientID: "440901487-9qrj7gfd8iqfedce30jml2r3ukh8eees.apps.googleusercontent.com",
 clientSecret: "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",
 callbackURL: "http://localhost:3005/google/callback"
 },
 function(accessToken, refreshToken, profile, done) {
 return done(null, profile);
 }
));
passport.use(new
    LocalStrategy({usernameField:"email",passwordField:"password"},
    function(email,password,done){
    sistema.loginUsuario({"email":email,"password":password},function(user){
        if(user.email!=-1){
            return done(null,user);
        }
        else{
            return done(-1);
        }
        })
    }
    ));