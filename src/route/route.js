//const { Router } = require("express");
const express=require("express")
const router=express.Router()
const userController=require("../controller/userController")
const productController = require('../controller/productController')
const {authentication,authorization} = require("../middleware/auth")

router.post("/register", userController.createUser);
router.post("/login", userController.userLogin);
router.get("/user/:userId/profile",authentication,userController.getUser);
router.put("/user/:userId/profile", authentication, authorization, userController.updateUsersProfile);
router.post("/products", productController.createProduct);
router.get("/products", productController.getProductsByFilter);
router.get("/products/:productId",productController.productsById )
router.put("/products/:productId",productController.updateProducts)
router.delete('/products/:productId', productController.deleteProduct)



router.all("/*", function (req, res) {
    res.status(404).send({status: false,message: "Make Sure Your Endpoint is Correct !!!"})
})
module.exports = router;