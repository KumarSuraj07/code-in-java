const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/CodeInJava",{
    //useCreateindex:true,
    useNewUrlParser:true,
    useUnifiedtopology:true,
}).then(()=>{
    console.log("Connection Succesfull");
}).catch((error)=>{
    console.log(error);
})

