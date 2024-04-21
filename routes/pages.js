const express = require("express")
const router = express.Router()
const UserController = require("../controllers/users")
const productController = require("../controllers/productcontroller") 

router.get(["/","/login"], (req,res) => {
    res.render("login.hbs");
});
router.get("/register", (req,res) => {
    res.render("register.hbs");
});
router.get("/admin", (req,res) => {
    res.render("admin.hbs");
});

router.get("/profile", UserController.isLoggedIn, (req,res) => {
    if (req.user) {
        res.render("profile.hbs",{ user: req.user });
    } else {
        res.redirect("/login")
    }
});

router.get("/home", UserController.isLoggedIn,(req,res) => {
    //console.log(req.name)
    if (req.user) {
        res.render("Home.hbs",{ user: req.user });
    } else {
        res.redirect("/login")
    }
    
});
router.get("/aboutus", UserController.isLoggedIn, (req,res) => {
    if (req.user) {
        res.render("aboutus.hbs",{ user: req.user });
    } else {
        res.redirect("/login")
    }
});
router.get("/blog", UserController.isLoggedIn, productController.userview,(req,res) => {
    if (req.user) {
        res.render("blog.hbs",{ user: req.user });
    } else {
        res.redirect("/login")
    }
});

router.get("/product", UserController.isLoggedIn,productController.prouserview,(req,res) => {
    if (req.user) {
        res.render("product.hbs",{ user: req.user });
    } else {
        res.redirect("/login")
    }
});

router.get("/service", UserController.isLoggedIn, (req,res) => {
    if (req.user) {
        res.render("service.hbs",{ user: req.user });
    } else {
        res.redirect("/login")
    }
});

router.get("/users", UserController.isAdminIn,UserController.users, (req,res) => {
    if (req.user) {
        res.render("users.hbs",{ user: req.user });
    } else {
        res.redirect("/admin")
    }
});
  

router.get("/offeruser", UserController.isLoggedIn,productController.offeruser, (req,res) => {
    if (req.user) {
        res.render("offeruser.hbs",{ user: req.user });
    } else {
        res.redirect("/login")
    }
});


module.exports = router;