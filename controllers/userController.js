const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const hashing = require('../utils/hashing')

const RegisterUser = async(req, res)=>{
    try{
        const { username, email, password } = req.body;
        if(!username || !email || !password ) return res.status(400).json({ message : 'all field required'})

        const ExistUser = await User.findOne({ email })
        if(ExistUser) return res.status(400).json({ message : 'User already Exist'}) 
            
        const HashingPassword = await hashing(password)
        
        const NewUser = await User.create({
            username,
            email, 
            password : HashingPassword
        });

        res.status(201).json({ message : 'Successefuly to create User'})
    }
    catch{
       res.status(500).json({ message : 'Server Error'})
    }
}

const LoginUser = async (req, res) =>{
    try{
        const { email, password } = req.body;
        if( !email || !password ) return res.status(400).json({ message : 'all field required'})

        const FindUser = await User.findOne({ email })
        if(!FindUser) return res.status(400).json({ message : 'Error'})  
        
        const IsPasswordCorrect = await bcrypt.compare(password, FindUser.password)
        if(!IsPasswordCorrect) return res.status(400).json({ message : 'Error'})
        
        const Token = jwt.sign({id : FindUser._id}, process.env.JWT_SECRET, {expiresIn : '7d'})    

        res.status(200).json({message : 'Successefuly to Login',
             Token,
             user:{
                id: FindUser._id,
                username: FindUser.username,
             } 
            })
    }
    catch{
        res.status(500).json({ message : 'Server Error'})
    }
}

const getAllUser = async (req, res) =>{
    try{
        const users = await User.find().select('-password')
        res.status(200).json(users)
    }
    catch{
        res.status(500).json({ message : 'Server Error'})
    }
}


module.exports = { RegisterUser, LoginUser, getAllUser}