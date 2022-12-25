const customerModel = require('../models/customerModel');
const {isEmpty, isValidEmail,isValidPhone}=require('../validator/validator');

const createCustomer = async function(req,res){
 try{
    let data = req.body;
    let {firstName,lastName,mobileNumber,emailID,address}=data;
  if (!isEmpty(firstName)) {
    return res.status(400).send({status: "false", message: "first name must be present"});
  }
  if (!isEmpty(lastName)) {
    return res.status(400).send({status: "false", message: "last name must be present"});
  }
  if (!isEmpty(mobileNumber)) {
    return res.status(400).send({status: "false", message: "mobile number must be present"});
  }
  if (!isEmpty(emailID)) {
    return res.status(400).send({status: "false", message: "eamil must be present"});
  }
  if (!isEmpty(address)) {
    return res.status(400).send({status: "false", message: "address must be present"});
  }
  if(!isValidEmail(emailID)){
    return res.status(400).send({status: "false", message: "email should be valid"});
  }
  if(!isValidPhone(mobileNumber)){
    return res.status(400).send({status: "false", message: "phone no should be valid"});
  }
  let emailExist = await customerModel.findOne({emailID:emailID});
  if(emailExist){
    res.status(400).send({status:false,msg:'email is already exist'})
  }
  let createUser = await customerModel.create(data);
  res.status(201).send({status:true,data:createUser})
}catch(error){
    return res.status(500).send({status:false,msg:error.message});
}
}
const getAllCustomer = async (req,res)=>{
  try{
    let data = req.query;
    let data2;
    if(data.status==="DEACTIVE"){
      let deletedData=await customerModel.find(data)
      res.status(200).send({status:false,msg:"list of deleted customer",data:deletedData})
    }
    if(data.status==='ACTIVE')
    data2 = await customerModel.find(data);
    res.status(200).send({status:true,data:data2});
  }catch(error){
    res.status(500).send({status:false,msg:error.message})
  }
}

let deleteCustomer = async (req,res)=>{
  try{
    let emailID =req.params.emailID;
    let existUser = await customerModel.findOne({emailID:emailID});
    if(!existUser){
      res.status(400).send({status:false,msg:"customer does not exist"});
    }
    if(existUser.status==="DEACTIVE"){
      res.status(400).send({status:false,msg:'user is alredy deleted'})
    }
    existUser.status="DEACTIVE";
    let updateData = await customerModel.findOneAndUpdate({ emailID: emailID },existUser, {new: true});
    res.status(200).send({status:false,msg:"customer deleted succesfully",data:updateData});
  }catch(error){
    res.status(500).send({status:"false",msg:error.message})
  }
}
module.exports.createCustomer=createCustomer;
module.exports.getAllCustomer=getAllCustomer;
module.exports.deleteCustomer=deleteCustomer;