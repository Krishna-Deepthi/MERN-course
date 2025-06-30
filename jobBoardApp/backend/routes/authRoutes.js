const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register',async(req,res)=>{
    const {name,age,experience,email,password,role,createdAt}=req.body;

    try{
        const existingUser=await User.findOne({email});
        if(existingUser) return res.status(400).json({message:"email already registered!"});
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({name,age,experience,email,password:hashedPssword});

        await newUser.save();
        res.status(201).json({message:'user registered successfully'});

    }
    catch(err){
        console.error(err);
        res.status(500).json({message:'registration failed'});
    }
});
router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user= await User.findOne({email});
        if(!user) return res.status(400).json({message:"email not found"});
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(401).json({message:"invalid password"});
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
         res.json({ message: 'Login Successful', token });
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"login failed"});
    }
});
module.exports=router;