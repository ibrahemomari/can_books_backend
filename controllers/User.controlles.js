const userModels=require('../models/User.models');
const userController=(req,res)=>{
    let email=req.query.email
    userModels.findOne({email:email}, (error, books)=>{
        if (error){
            res.send(error.message)
        }
        res.send(books);
    });
}


module.exports=userController;