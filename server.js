'use strict';
const express=require('express');
const app=express();
const cors=require('cors');
const jwt=require('jsonwebtoken');
const jwksClient=require('jwks-rsa');
const mongoose=require('mongoose');
const {userController,addBook,deleteBook,updateBook}=require('./controllers/User.controlles');
require('dotenv').config();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/user',
    { useNewUrlParser: true, useUnifiedTopology: true }
);


// user end-point
app.get('/books',userController);

// user add book end-point
app.post('/addbook',addBook);

// user delete book end-point
app.delete('/deletebook/:index',deleteBook);

// user update book end-point
app.put('/updatebook/:index',updateBook);

const client = jwksClient({
    // this url comes from your app on the auth0 dashboard 
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  });

// this is a ready to use function
const getKey=(header, callback)=>{
    client.getSigningKey(header.kid, function(err, key) {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
      });
}

// 'Bearer ;alsdkj;laskd;lkasd;lkl'
app.get('/authorize',(req,res)=>{
    const token=req.headers.authorization.split(' ')[1];
    jwt.verify(token,getKey,{},(err,user)=>{
        if(err){
            res.send('invalid token');
        }
        res.send(user)
    })
    res.send(token);
});

app.listen(process.env.PORT,()=>{
    console.log(`listening to port: ${process.env.PORT}`);
})

