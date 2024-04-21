const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { promisify } = require("util")
const alert = require("alert")

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,
});



exports.admin = async (req,res)=>{
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).render('admin',{
                msg: "Please Enter Your Email and Password",
                msg_type: "error",
            });
        }

        db.query("select * from adminlogin where name=?",
        [email],async(error, result)=>{
             console.log(result);
             if(result.length<=0){
                return res.status(401).render('admin',{
                    msg: "Email or Password Incorrect...",
                    msg_type: "error",
                });
             }else{
             if(!password, result[0].PASS){
                return res.status(401).render('admin',{
                    msg: "Email or Password Incorrect...",
                    msg_type: "error",
                });
             } else{
                const id = result[0].ID;
                const token = jwt.sign({ id: id },process.env.JWT_SECRET1 ,{
                expiresIn: process.env.JWT_EXPIRES_IN,
                });
            console.log("The token is" + token);
            const cookieOptions = {
                expires: new Date( 
                    Date.now() + 
                       process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                       ),
                       httpOnly: true,
            };
            res.cookie("adminin", token, cookieOptions);
            res.status(200).redirect("/adview")
             }
            }
            }
    );
    } catch (error) {
        console.log(error);
    }
};

exports.users=(req,res)=>{
    
         db.query("select * from users",(err,rows)=>{
            
            if (!err){
                console.log("users datas Data Securelyu")
                res.render("users.hbs",{rows});
                
                console.log(rows)
            }else{
                console.log("errr in listing data"+err);
            }
        }) 
    }  

exports.login = async (req,res)=>{
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).render('login',{
                msg: "Please Enter Your Email and Password",
                msg_type: "error",
            });
        }

        db.query("select * from users where email=?",
        [email],async(error, result)=>{
             console.log(result);
             if(result.length<=0){
                return res.status(401).render('login',{
                    msg: "Email or Password Incorrect...",
                    msg_type: "error",
                });
             }else{
             if(!(await bcrypt.compare(password, result[0].PASS))){
                return res.status(401).render('login',{
                    msg: "Email or Password Incorrect...",
                    msg_type: "error",
                });
             } else{
                const id = result[0].ID;
                const token = jwt.sign({ id: id },process.env.JWT_SECRET ,{
                expiresIn: process.env.JWT_EXPIRES_IN,
                });
            console.log("The token is" + token);
            const cookieOptions = {
                expires: new Date( 
                    Date.now() + 
                       process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                       ),
                       httpOnly: true,
            };
            res.cookie("freshices", token, cookieOptions);
            res.status(200).redirect("/home")
             }
            }
            }
    );
    } catch (error) {
        console.log(error);
    }
};

exports.register= (req,res)=>{
   //console.log(req.body)
   /*const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;
   const repassword = req.body.repassword
   
    //res.send("Form Submitted")*/
    const { name, email, password, repassword } = req.body;
    db.query(
    "select email from users where email=?",
    [email],
    async(error,result,) => {
        if(error){
            console.log(error)
        }

        if(result.length>0){
            return res.render("register",{msg:"Email id is Already Taken",
            msg_type:"error"});

        }else if(name,email,password,repassword == ""){
            return res.render("register",{msg:"All Fields Are Mandatory",
            msg_type:"error"});

        }else if(password.length<6){
            return res.render("register",{msg:"password must be above 6 character",
            msg_type:"error"});

        } else if(password != repassword){
            return res.render("register",{msg:"Password Do not Match",
            msg_type:"error"});
        }
        let hashedPasssword =await bcrypt.hash(password,8);
        
        db.query(
            "insert into users set ?",
            {name:name,email:email,pass:hashedPasssword},
            (error, result) => {
               if(error){
                console.log(error);
               }else{
                console.log(result)
                
                return false;
           }
          }
        );res.redirect("/login")
    }
  );
};


exports.isAdminIn = async (req, res, next) =>{
    //req.name="check Login.......";
    //console.log(req.cookies);
    if(req.cookies.adminin){
        try {
            const decode = await promisify(jwt.verify)(
                req.cookies.adminin,
                process.env.JWT_SECRET1
               );
               //console.log(decode);
               db.query("select * from adminlogin where id=?",
               [decode.id],
               (err,results)=>{
                   // console.log(results)
                   if(!results){
                    return next();
                   }
                   req.user = results[0];
                   return next()
               }); 
        } catch (error) {
            console.log(error)
            return next();
        }
       
    }else{
        next();
    }

};

 
exports.isLoggedIn = async (req, res, next) =>{
    //req.name="check Login.......";
    //console.log(req.cookies);
    if(req.cookies.freshices){
        try {
            const decode = await promisify(jwt.verify)(
                req.cookies.freshices,
                process.env.JWT_SECRET
               );
               //console.log(decode);
               db.query("select * from users where id=?",
               [decode.id],
               (err,results)=>{
                   // console.log(results)
                   if(!results){
                    return next();
                   }
                   req.user = results[0];
                   return next()
               }); 
        } catch (error) {
            console.log(error)
            return next();
        }
       
    }else{
        next();
    }
};

exports.logout = async (req, res) =>{
    res.cookie("freshices","logout",{
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true,
    });
    res.status(200).redirect("/");
};

exports.adminlogout = async (req, res) =>{
    res.cookie("adminin","adminlogout",{
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true,
    });
    res.status(200).redirect("/admin");
};


