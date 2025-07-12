const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    experience: { type: Number, required: true },
    company_name: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: String, default: 'applied' },
    applied_at: { type: Date, default: Date.now }
});

const JobApplication = mongoose.model('job_application', jobApplicationSchema);
module.exports = JobApplication;