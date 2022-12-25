const mongoose = require('mongoose');
const shortid = require('shortid')

const customerSchema = new mongoose.Schema({
firstName:{
    type:String,
    require:true
},
lastName:{
    type:String,
    require:true
},
mobileNumber:{
    type:Number,
    require:true
},
DOB: {
    type: String,
    // validate: {
    //   validator: (el) =>
    //     new Date(el) < Date.now() && npmValid.isDate(el, new Date()),
    //   message:
    //     'Invalid Date! Date should be less than today and format YYYY-MM-DD',
    // },
  },
  emailID: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true,
  },
  customerID: {
    type: String,
    default: shortid.generate()
  },
  status: {
    type: String,
    default: 'ACTIVE',
  }
})
module.exports = mongoose.model("customer", customerSchema);