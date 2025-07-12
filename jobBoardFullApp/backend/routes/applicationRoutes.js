const express=require('express');
const router=express.Router();
const mongoose = require('mongoose'); 

const job_application=require('../models/job_application');
router.post('/apply', async (req, res) => {
    const { name, age, experience, company_name, role, user_id } = req.body;

    try {
        const existing = await job_application.findOne({ company_name, role, user_id:new mongoose.Types.ObjectId(user_id) });
        if (existing) return res.status(400).json({ message: "Already applied for this job" });

        const newApplication = new job_application({
            name,
            age,
            experience,
            company_name,
            role,
            user_id:new mongoose.Types.ObjectId(user_id) 
            //status: "applied"
        });

        await newApplication.save();
        res.status(201).json({ message: "Successfully applied" });
        console.log("DATA RECEIVED:", { name, age, experience, company_name, role, user_id });

console.log("user_id type:", typeof user_id);
console.log("Is user_id valid?", mongoose.Types.ObjectId.isValid(user_id));

    } catch (err) {
        console.error("error during save");
        res.status(500).json({ message: "Failed to apply" });
    }
});

router.get('/user/:userId',async(req,res)=>{
    const userId=req.params.userId;
    try {
        const applications = await job_application.find({ user_id: userId }).populate('job_id');
        res.json(applications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch applications' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const applications = await job_application.find().populate('job_id user_id');
        res.json(applications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch all applications' });
    }
});

module.exports = router;
