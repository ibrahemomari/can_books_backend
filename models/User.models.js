'use strict';
const mongoose=require('mongoose');

// book schema
const bookSchema=new mongoose.Schema({
    name:String,
    description:String,
    status:String
})

// user schema
const userSchema= new mongoose.Schema({
    email:{type:String},
    books:[bookSchema]
})



const user=mongoose.model('user',userSchema);



const ibrahem= new user(
    {
        email:'ibrahem.omari96@gmail.com',
        books:[{
            name: 'Eloquent javascript',
            description: 'This is a book about instructing computers',
            status:'In-stock'
        } ,
        {
            name: 'Al-asoud yl8 bk',
            description: 'about the relations in love',
            status:'In-stock'
        },
        {
            name: 'Secret',
            description: 'how to atract what you want',
            status:'In-stock'
        },

        {
            name: 'fe 8lbi 2untha 3briah ',
            description: 'story love',
            status:'out-stock'
        }
    
    ]
    }
);
const ethar= new user(
    {
        email:'eattaamneh@yahoo.com',
        books:[{
            name: 'intro to C++',
            description: 'This is a book about build cleint applications',
            status:'In-stock'
        } ,
        {
            name: '8ua3ed al3sh8 alarb3on',
            description: 'Unless we learn to love God’s creation, we cannot truly love and we will never truly know God',
            status:'In-stock'
        },
        {
            name: 'fan al-lamubalah',
            description: 'The book says that a person does not necessarily have to be positive all the time and that the key to a stronger and happier human being',
            status:'out-stock'
        }
    
    ]
    }
);

ibrahem.save();
ethar.save();








module.exports=user;