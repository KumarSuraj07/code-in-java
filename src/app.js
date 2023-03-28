const express = require("express");
const path = require("path");
require("./DB/conn");
const User = require("./models/usermessage");
const hbs = require("hbs");
const { registerPartials } = require("hbs");

const app = express();
const port = process.env.PORT || 3001;

//setting the path
const staticpath = path.join(__dirname,"../public");
const templatepath = path.join(__dirname,"../templates/views");
const partialpath = path.join(__dirname,"../templates/partials");

//console.log( path.join(__dirname,"../public"));

//middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);


//routing 
app.get("/",(req,res)=>{
    res.render("index");
})


app.post("/contact", async(req, res)=>{
    console.log(req.body);
    try{
        const userData = new User(req.body);
        await userData.save();
        console.log(userData);
        res.status(201).redirect("/");
    }catch (error){
        console.log(error);
        res.status(500).send(error);
    }
})

app.get("/user/:id", async (req, res) => {
    console.log(req.params);
    try{
        const user = await User.find({_id: req.params.id})
        res.send(user);
    } catch(err){
        console.log(err.message);
        res.send(err);
    }
})

//creating server
app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})
