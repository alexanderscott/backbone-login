/*
 * Node Express app server with API endpoints
 * --------------------------------------------
 * Creates a SQLite3 schema and users table for inserting, updating, and deleting
 * user records.  Passwords are salted and a combined salt+hash is stored in the db.
 * Also signs and unsigns cookies which it uses to persist the client's authentication. 
 * 
*/

var express = require('express'),
    http = require('http'),

    config = require("./config"),
    bcrypt = require("bcrypt"),
    sqlite = require("sqlite3"),
    _ = require("underscore"),

    app = express(),
    port = process.env.PORT || config.port,
    server = http.createServer(app).listen(port);



// Initialize sqlite and create our db if it doesnt exist
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(__dirname+'/db/bb-login.db');


// Create our users table if it doesn't exist
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, username TEXT UNIQUE, password TEXT, auth_token TEXT UNIQUE)");


// Allow node to be run with proxy passing
app.enable('trust proxy');

// Logging config
app.configure('local', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
    app.use(express.errorHandler());
});


// Compression (gzip)
app.use( express.compress() );
app.use( express.methodOverride() );
app.use( express.urlencoded() );            // Needed to parse POST data sent as JSON payload
app.use( express.json() );


// Cookie config
app.use( express.cookieParser( config.cookieSecret ) );           // populates req.signedCookies
app.use( express.cookieSession( config.sessionSecret ) );         // populates req.session, needed for CSRF

// We need serverside view templating to initially set the CSRF token in the <head> metadata
// Otherwise, the html could just be served statically from the public directory
app.set('view engine', 'html');
app.set('views', __dirname + '/views' );
app.engine('html', require('hbs').__express);


app.use(express.static(__dirname+'/public'));
app.use(express.csrf());


app.use( app.router );


app.get("/", function(req, res){
    res.render('index', { csrfToken: req.csrfToken() });
});

// GET /api/auth
// @desc: checks a user's auth status based on cookie
app.get("/api/auth", function(req, res){
    db.get("SELECT * FROM users WHERE id = ? AND auth_token = ?", [ req.signedCookies.user_id, req.signedCookies.auth_token ], function(err, user){
        if(user){
            res.json({ user: _.omit(user, ['password', 'auth_token']) });   
        } else {  
            res.json({ error: "Client has no valid login cookies."  });   
        }
    });
});

// POST /api/auth/login
// @desc: logs in a user
app.post("/api/auth/login", function(req, res){
    db.get("SELECT * FROM users WHERE username = ?", [ req.body.username ], function(err, user){
        if(user){

            // Compare the POSTed password with the encrypted db password
            if( bcrypt.compareSync( req.body.password, user.password)){
                res.cookie('user_id', user.id, { signed: true, maxAge: config.cookieMaxAge  });
                res.cookie('auth_token', user.auth_token, { signed: true, maxAge: config.cookieMaxAge  });

                // Correct credentials, return the user object
                res.json({ user: _.omit(user, ['password', 'auth_token']) });   

            } else {
                // Username did not match password given
                res.json({ error: "Invalid username or password."  });   
            }
        } else {
            // Could not find the username
            res.json({ error: "Username does not exist."  });   
        }
    });
});

// POST /api/auth/signup
// @desc: creates a user
app.post("/api/auth/signup", function(req, res){
    db.serialize(function(){
        db.run("INSERT INTO users(username, name, password, auth_token) VALUES (?, ?, ?, ?)", 
                [ req.body.username, req.body.name, bcrypt.hashSync(req.body.password, 8), bcrypt.genSaltSync(8) ], function(err, rows){
            if(err){
                res.json({ error: "Username has been taken.", field: "username" }); 
            } else {

                // Retrieve the inserted user data
                db.get("SELECT * FROM users WHERE username = ?", [ req.body.username ], function(err, user){
                    if(!user) {
                        console.log(err, rows);
                        res.json({ error: "Error while trying to register user." }); 
                    } else {

                        // Set the user cookies and return the cleansed user data
                        res.cookie('user_id', user.id, { signed: true, maxAge: config.cookieMaxAge  });
                        res.cookie('auth_token', user.auth_token, { signed: true, maxAge: config.cookieMaxAge  });
                        res.json({ user: _.omit(user, ['password', 'auth_token']) });   
                    }
                });
            }
        });
    });
});


// POST /api/auth/logout
// @desc: logs out a user, clearing the signed cookies
app.post("/api/auth/logout", function(req, res){
    res.clearCookie('user_id');
    res.clearCookie('auth_token');
    res.json({ success: "User successfully logged out." });
});

// POST /api/auth/remove_account
// @desc: deletes a user
app.post("/api/auth/remove_account", function(req, res){
    db.run("DELETE FROM users WHERE id = ? AND auth_token = ?", [ req.signedCookies.user_id, req.signedCookies.auth_token ], function(err, rows){
        if(err){ 
            res.json({ error: "Error while trying to delete user." }); 
        } else {
            res.clearCookie('user_id');
            res.clearCookie('auth_token');
            res.json({ success: "User successfully deleted." });
        }
    });
});


// Close the db connection on process exit 
// (should already happen, but to be safe)
process.on("exit", function(){
    db.close();
});

console.log("STARTUP:: Express server listening on port::", port, ", environment:: ", app.settings.env);
