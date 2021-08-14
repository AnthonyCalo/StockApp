require('dotenv').config()

const express = require('express');
const mongoose= require('mongoose');
const session =require('express-session');
const passport = require('passport');
const cors= require('cors');
const cookieParser=require('cookie-parser');
const bodyParser = require("body-parser");
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcryptjs');
const cookieSession= require("cookie-session");

const app=express();

app.use(
    cookieSession({
        maxAge: 30 *24 *60*60*1000,
        keys: ['fkfjeoinoeasdfanieojh']
    })
)

app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app 
      credentials: true,
    })
  );
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true
}));
//middle ware required to initialize passport
app.use(passport.initialize());
//session is required to have a persisent login sesion
app.use(passport.session());

//connect to mongoose database
mongoose.connect("mongodb://localhost:27017/stocksDB", {useNewUrlParser: true, useUnifiedTopology: true});

//DB schema. User pass and stock list
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    stock_list: [String]
})

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);


app.use(cookieParser(process.env.secretcode));
//Simplified passport/ passport-local configuration. copied from passport-local-mongoose documentation @ npmjs.com 
passport.use(User.createStrategy());

//copied from  passportJS docs. This will work with every strategy for serializing/ deserializing users
passport.serializeUser(function(user, done){
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

//Routes
app.post("/register", (req,res)=>{
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if(!err){
            passport.authenticate("local")(req, res, function(){
                res.send("new user added");                    
            })
        }else{
            console.log(err);
            res.redirect("/login");
        }
    })
    
});
// User.findOne({username: req.body.username},async (err, doc)=>{
    //     if (err) throw err;
    //     if (doc) res.send("User already exists");
    //     if(!doc){
    //         const hashedPass = await bcrypt.hash(req.body.password, 10);
    //         const newUser = new User({
    //             username: req.body.username,
    //             password: hashedPass
    //         });
    //         await newUser.save();
    //         res.send("user created");
    //     }
    // })

//login with passport local strategy    
app.route("/login")
    .post((req, res)=>{
        console.log("request recieved");
        const user = new User({
            username: req.body.username,
            password: req.body.password
        })
    
        req.login(user, function(err){
            console.log("AT the login");
            if (err) console.log(err);
            if(!err){
                console.log("here");

                passport.authenticate("local")(req,res, ()=>{

                        res.redirect('signedin');
                    })
                }
            })
    });
//returns user stock List
app.get("/user_stocks", (req, res)=>{
    if(req.isAuthenticated()){
        console.log("AT STONK LIST");
        User.findOne({ _id: req.user.id}, (err, user)=>{
            res.send(user.stock_list);
        })
    }

})
//appends stock to user stock list
app.post("/add_user_stock", (req, res)=>{
    if(req.isAuthenticated()){
        User.findOne({_id: req.user._id}, (err, user)=>{
            if(err) throw err;
            if(user){
                console.log(user);
                console.log(req.body.ticker);
                user.stock_list.push(req.body.ticker);
                user.save();
                console.log("stonk added");
            }else{
                console.log('No User')
            }

        })
    }else{
        console.log("NOT AUTHENTICATED");
    }
    
});

//checks if user signed in . 
//Returns false or user data
app.get("/signedin", function(req, res){
    console.log(req.user);
    //req.isauthenticated works because client axios sends withCrenentials
    //passport method checks if user is signed in 
    if(req.isAuthenticated()){
        res.send(req.user);
    }else{
        res.send(false);
    }
})
app.get("/logout", function(req, res){
    //all thats needed to logout is .logout method from passport
    req.logout();
    res.send("signed out");
})


app.listen(3001, ()=>{
    console.log("Server started on port 3001");
})

