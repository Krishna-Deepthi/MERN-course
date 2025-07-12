const mongoose = require('mongoose');

const jobListingsSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  role: { type: String, required: true },
  requirements: { type: String, required: true },
  annual_package: { type: Number, required: true },
}, {
  timestamps: true 
});

const JobListing = mongoose.model('job_listings', jobListingsSchema);
module.exports = JobListing;
