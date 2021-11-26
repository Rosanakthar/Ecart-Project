import express from 'express';
import mongoose from 'mongoose';
import data from './data.js';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import orderRoute from './routers/orderRouter.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/ecart', {
  useNewUrlParser: true,
  
});

app.get("/api/products/:id",(req , res)=>{
    const product = data.products.find((x) => x.id === req.params.id);
    if(product){
        res.send(product);
    } 
    else{
        res.status(404).send({message : 'product not found'})
    }
});

app.get("/api/slide/:id",(req , res)=>{
    const sld = data.slide.find((y) => y.id === req.params.id);
    if(sld){
        res.send(sld);
    } 
    else{
        res.status(404).send({message : 'product not found'})
    }
});

app.get("/api/products",(req , res)=>{
    res.send(data.products);
    //res.send(data.slide);

});
app.get("/api/slide",(req , res)=>{
    res.send(data.slide);

});

app.use('/api/users', userRouter);
app.use('/api/orders',orderRoute);

app.get('/api/config/paypal',(req , res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.get("/" ,(req , res) => {
    res.send("Server Running");
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });
const port = 5000;
app.listen(port , () =>{
    console.log("Server running under"+port);
});