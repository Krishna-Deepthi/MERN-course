const express=require('express');
const router=express.Router();
const job_application=require('../models/job_application');
router.post('/apply',async(req,res)=>{
    const {job_id,user_id}=req.body;
    try{
        const existing=await job_application.findOne({job_id,user_id});
        if(existing) return res.status(400).json({message:"already applied"});
        const newApplication= new job_application({
            job_id,
            user_id,
        });
        await newApplication.save();
        res.status(201).json({message:"successfully applied"});

    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"failed to apply"});

    }
});
router.delete('/withdraw/:id',async(req,res)=>{
    const applicationId=req.params.id;
    try{
        await job_application.findByIdAndDelete(applicationId);
        res.json({message:"application withdrawn successfully!"});

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"failed to withdraw application"});

    }
});

router.get('/user/:userId',async(req,res)=>{
    const userId=req.params.userId;
    try {
        const applications = await JobApplication.find({ user_id: userId }).populate('job_id');
        res.json(applications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch applications' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const applications = await JobApplication.find().populate('job_id user_id');
        res.json(applications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch all applications' });
    }
});

module.exports = router;
