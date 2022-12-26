const express=require("express")
const router=express.Router()
const customerController=require("../controller/customerController")
const cardController = require('../controller/cardController')

router.post('/create',customerController.createCustomer);
router.get('/getCustomer',customerController.getAllCustomer);
router.delete('/deleteCustomer/:emailID',customerController.deleteCustomer);
router.post('/createCard',cardController.createCard)
router.get('/getAllCard',cardController.getAllCard)
module.exports=router;