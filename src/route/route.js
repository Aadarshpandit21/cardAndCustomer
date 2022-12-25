const express=require("express")
const router=express.Router()
const customerController=require("../controller/customerController")

router.post('/create',customerController.createCustomer);
router.get('/getCustomer',customerController.getAllCustomer);
router.delete('/deleteCustomer/:emailID',customerController.deleteCustomer);
module.exports=router;