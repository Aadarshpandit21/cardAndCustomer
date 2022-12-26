const shortid = require('shortid');
const cardModel = require('../models/cardModel');
const customerModel = require('../models/customerModel');
const createCard = async function(req,res){
   try{ let data = req.body;
     let {customerId}=data;
     if(!customerId){
        res.status(400).send({status:'false',msg:"customer id should be there"})
     }
     let existUser = await customerModel.findById(customerId);
     if(existUser.status==="DEACTIVE"){
        res.status(400).send({status:false,msg:"user is deactivated"});
     }
    if(existUser.status==="ACTIVE"){ 
        data.cardNumber = shortid.generate();
     data.customerName = existUser.firstName + " " + existUser.lastName;
     let Data = await cardModel.create(data);
    res.status(201).send({status:true,data:Data});
   }
  }catch(err){
    res.status(500).send({status:false,msg:err.message})
  }
}

const getAllCard = async(req,res)=>{
    try{
     let data={};
      const get = await cardModel.find(data);
      res.status(200).send({status:"true",msg:`list of ${get.length} objects`,data:get});
    }catch(error){
        res.status(500).send({status:false,msg:error.message})
    }
}

module.exports.createCard=createCard;
module.exports.getAllCard=getAllCard;