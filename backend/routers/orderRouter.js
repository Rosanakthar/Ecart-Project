import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModule.js";
import { isAdmin,isAuth } from "../utils.js";

import express from 'express';


const orderRoute = express.Router();

orderRoute.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'name');
    res.send(orders);
  })
);

orderRoute.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
)

orderRoute.post(
    '/',
    isAuth,
    expressAsyncHandler(async(req,res) => 
{
    //if(req.body.orderItem==0){
    //    res.status(400).send({message:'cart is empty'});
    //}
    //else{
        const order = new Order({
            orderItems:req.body.orderItemsItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        const createdOrder = await order.save();
        res.status(201).send({message:'New Order Created',order:createdOrder});
    //}
}));

orderRoute.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );

  orderRoute.get('/orderlist', isAuth,expressAsyncHandler(async(req,res)=>{
    //  await Order.find({},(err,Order)=>{
    //   if(err){
    //     res.send(err);
    //     console.log(err); 
    //   }
    //   else{
    //     res.send(Order);
    //     console.log(Order);
    //   }
    // });
    var result = [];
    const orders = await Order.find({});
    console.log(orders);
    order.forEach((doc,err)=>{
    result.push(doc);
    },(result)=>{
      res.send({iteam:result});
    })
    res.send(orders);
    
  }))
export default orderRoute;