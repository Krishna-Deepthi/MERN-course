const mongoose=require('mongoose');
const job_listingsSchema=new mongoose.Schema({
    annual_package:{type:Number},
    company_name:{type:String},
    requirements:{type:String},
    role:{type:String},
});
const job_listings=mongoose.model('job_listings',job_listingsSchema);
module.exports=job_listings
