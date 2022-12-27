const cartModel = require("../model/cartModel");
const productModel = require("../model/productModel");
const userModel = require("../model/userModel");
const validation = require("../validator/validator");

const { isEmpty, isValidObjectId } = validation;

// =================================> CREATE CART <========================================//

const createCart = async (req, res) => {
    try {
      let data = req.body;
      if (Object.keys(data).length == 0)
        return res.status(400).send({status: false, message: "Body cannot be empty"});
  
      let userId = req.params.userId;
      if (!isValidObjectId(userId))
        return res.status(400).send({status: false, message: "Invalid userId Id"});
  
      let { productId, cartId, quantity } = data;
      if (!isEmpty(productId))
        return res.status(400).send({status: false, message: "productId required"});
      if (!isValidObjectId(productId))
        return res.status(400).send({status: false, message: "Invalid productId"});
  
      if (!quantity) {quantity = 1}
  
      quantity = Number(quantity);
      if (typeof quantity !== "number")
        return res.status(400).send({status: false, message: "quantity must be a number"});
      if (quantity < 1)
        return res.status(400).send({status: false, message: "quantity cannot be less then 1"});
  
      if (cartId) {                                       // checking cartId
        if (!isValidObjectId(cartId))
          return res.status(400).send({status: false, message: "Invalid cartId"});
      }
  
      let checkUser = await userModel.findOne({_id: userId});
      if (!checkUser)
        return res.status(404).send({status: false, message: "User does not exists"});
  
      if (cartId) {
        var findCart = await cartModel.findOne({_id: cartId});
        if (!findCart)
          return res.status(404).send({status: false, message: "Cart does not exists"});
      }

      let checkProduct = await productModel.findOne({_id: productId,isDeleted: false});
      if (!checkProduct)
        return res.status(404).send({status: false,message: "No products found or product has been deleted"});
  
      let checkCart = await cartModel.findOne({ userId: userId });
      if (!checkCart && findCart) {
        return res.status(403).send({status: false, message: "Cart does not belong to this user"});
      }
      if (checkCart) {
        if (cartId) {
          if (checkCart._id.toString() != cartId)
            return res.status(403).send({status: false,message: "Cart does not belong to this user"});
        }
        let ProdIdInCart = checkCart.items;
        let uptotal = checkCart.totalPrice + checkProduct.price * Number(quantity);
        let productId = checkProduct._id.toString();
        for (let i = 0; i < ProdIdInCart.length; i++) {
          let productfromitem = ProdIdInCart[i].productId.toString();
  
          //updates previous product i.e QUANTITY
          if (productId == productfromitem) {
            let previousQuantity = ProdIdInCart[i].quantity;
            let updatedQuantity = previousQuantity + quantity;
            ProdIdInCart[i].quantity = updatedQuantity;
            checkCart.totalPrice = uptotal;
            await checkCart.save();
            return res.status(200).send({status: true, message: "Success", data: checkCart});
          }
        }
        //adds new product
        checkCart.items.push({productId: productId,quantity: Number(quantity)});
        let total = checkCart.totalPrice + checkProduct.price * Number(quantity);
        checkCart.totalPrice = total;
        let count = checkCart.totalItems;
        checkCart.totalItems = count + 1;
        await checkCart.save();
        return res.status(200).send({status: true, message: "Success", data: checkCart});
      }
  
      let calprice = checkProduct.price * Number(quantity);           // 1st time cart
      let obj = {userId: userId,
        items: [{productId: productId,quantity: quantity}],
        totalPrice: calprice,
      };
      obj["totalItems"] = obj.items.length;
      let result = await cartModel.create(obj);
      return res.status(201).send({status: true, message: "Success", data: result});
    } catch (err) {
      return res.status(500).send({ status: false, err: err.message });
    }
  };

  module.exports.createCart=createCart;