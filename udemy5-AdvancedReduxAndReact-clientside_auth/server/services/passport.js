const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    // Verify this email and password, call done with the user. if it is the correct email and password,
    // otherwise, call done with false.

    User.findOne({ email: email}, function(err, user) {
        if (err) {return done(err); }
        if (!user) { return done(null, false); }

        user.comparePassword(password, function(err, isMatch) {
            if(err) { return done(err); }
            if(!isMatch) { return done(null, false); }

            return done(null, user);
        })
    })
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// payload is decoded jwt token (UserID + timestamp).
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    // See if the user ID is in the payload exists in our DB
    // If it does, call 'done' with that otherwise
    // otherwise, cal done without a user object
    User.findById(payload.sub, function(err, user) {
        if (err) {return done(err, false); }

        if (user){
            done(null, user);
        } else {
            done(null, false);
        }
    })
});

passport.use(jwtLogin);
passport.use(localLogin);
