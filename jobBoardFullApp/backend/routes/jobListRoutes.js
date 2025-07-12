const express = require('express');
const router = express.Router();
const job_listings = require('../models/job_listings');

router.post('/create',async(req,res)=>{
    const {annual_package,company_name,requirements,role}=req.body;
     try{
        const newJob=new job_listings({
            annual_package,
            company_name,
            requirements,
            role,
        });
        await newJob.save();
        res.status(201).json({ message: 'Job Listing Created Successfully' });

     }
     catch(err){
        console.error("error while creating a job ",err);
        res.status(500).json({message:'job listing is not created'});

     }
     
});
router.get('/',async(req,res)=>{
    try{
        const jobs=await job_listings.find();
        res.json(jobs);
    } catch(err){
        console.error(err);
        res.status(500).json({message:'failed to fetch job listings'});
    }
});
module.exports=router;