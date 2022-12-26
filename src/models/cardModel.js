const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
    cardNumber:{
        type:String,
        require:true
    },
    cardType:{
        type:String,
        require:true,
        enum:["Regular","Special"]
    },
    customerName:{
        type:String,
        require:true
    },
    status:{
        type:String,
        enum:["ACTIVE","DEACTIVE"],
        default:"ACTIVE"
    },
    vision:{
        type:String,
        require:true
    },
    customerId: {
        type: mongoose.Types.ObjectId,
        unique: true,
        ref: 'customer',
        required: [true, 'Please provide customer id!'],
      },
})
module.exports = mongoose.model('card',cardSchema);