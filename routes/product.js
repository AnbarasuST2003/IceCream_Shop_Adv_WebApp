const express = require("express")
const router = express.Router();
const productController = require("../controllers/productcontroller")
const fileUpload = require('express-fileupload');
const UserController = require("../controllers/users")

router.use(fileUpload());
router.use(express.static('upload'));
//view all records
router.get("/adview", UserController.isAdminIn,productController.view,(req,res) => {
    if (req.user) {
        res.render("adview.hbs",{ user: req.user });
    } else {
        res.redirect("/admin")
    }
})

//add new records
router.get("/addproduct",productController.addproduct, UserController.isAdminIn,(req,res) => {
    if (req.user) {
        res.render("addproduct.hbs",{ user: req.user });
    } else {
        res.redirect("/admin")
    }
})
router.post("/addproduct",productController.save)

//update records
router.get("/editproduct/:id",productController.editproduct)
router.post("/editproduct/:id",productController.edit)

//Delete records
router.get("/deleteproduct/:id",productController.delete)

//offers
router.get("/offer", UserController.isAdminIn,productController.offerview,(req,res) => {
    if (req.user) {
        res.render("offer.hbs",{ user: req.user });
    } else {
        res.redirect("/admin")
    }
})
//add offer
router.get("/addoffer", UserController.isAdminIn,(req,res) => {
    if (req.user) {
        res.render("addoffer.hbs",{ user: req.user });
    } else {
        res.redirect("/admin")
    }
})
router.post("/addoffer",productController.offer)
//update offer
router.get("/editoffer/:id",productController.editoffer)
router.post("/editoffer/:id",productController.edito)

//Delete offer
router.get("/deleteoffer/:id",productController.deleteoffer)


//Pro  slider
router.get("/avpro", UserController.isAdminIn,productController.proavview,(req,res) => {
    if (req.user) {
        res.render("avpro.hbs",{ user: req.user });
    } else {
        res.redirect("/admin")
    }
})
//add pro slider
router.get("/addpro", UserController.isAdminIn,(req,res) => {
    if (req.user) {
        res.render("addpro.hbs",{ user: req.user });
    } else {
        res.redirect("/admin")
    }
})
router.post("/addpro",productController.pro)

//update pro
router.get("/editpro/:id",productController.editpro)
router.post("/editpro/:id",productController.proo)

//Delete pro
router.get("/deletepro/:id",productController.deletepro)
/*
router.get("/index",(req,res)=>{
    res.render("index.hbs")
})
router.get("/adview",(req,res)=>{
    res.render("adview.hbs")
})*/
module.exports=router;