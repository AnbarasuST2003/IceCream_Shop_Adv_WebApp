const express = require("express");
//const mysql = require("mysql")
const app = express();
//const dotenv = require("dotenv")
const path = require("path")
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")
//const fileUpload = require('express-fileupload');
const { config } = require("dotenv");




require("dotenv"),config()

app.use(bodyParser.json());


app.use(cookieParser());
app.use(express.urlencoded({extended:false}))

/*
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,
})

db.connect((err)=> {
    if(err){
        console.log(err);
    }else{
        console.log("User Database Connected")
    }
})
*/
//for styling connection
const location = path.join(__dirname,"./public");
app.use(express.static(location))
app.set("view engine", "hbs")

//for partials
const partialspath = path.join(__dirname,"views", "partials")
hbs.registerPartials(partialspath)

//for other js file connection

app.use("/",require("./routes/pages"))
app.use("/authen",require("./routes/authen"))
app.use("/",require("./routes/product"))


app.listen(5000,()=>{
    console.log("server started at port 5000");
    
});