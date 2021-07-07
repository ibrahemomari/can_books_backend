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

// add new book 

const addBook=(req,res)=>{
    const {email,name,description,status}= req.body;
    
    userModels.findOne({email:email}, (error, books)=>{
        if(error){
            res.send('error');
        }else{
            books.books.push({
                name:name,
                description:description,
                status:status
            })
            books.save();
            res.send(books.books);
        }
    })
        
}

// delete book
const deleteBook=(req,res)=>{
    const email=req.query.email;
    const book_id=Number(req.params.index);
    console.log(book_id);
    userModels.findOne({email:email}, (error, books)=>{
        let newBookArra=[];
        books.books.forEach((el,idx)=>{
            if(idx!==book_id){
                newBookArra.push(el);
            }
        })
        books.books=newBookArra;
        books.save();
        res.send(books.books)
    });

}






module.exports={userController,addBook,deleteBook};