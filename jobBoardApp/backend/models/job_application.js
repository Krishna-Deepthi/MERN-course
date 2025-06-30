const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'job_listings', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, default: 'applied' },
    applied_at: { type: Date, default: Date.now }
});

const JobApplication = mongoose.model('job_application', jobApplicationSchema);
module.exports = JobApplication;
