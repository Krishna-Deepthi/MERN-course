require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const jobListRoutes = require('./routes/jobListRoutes');
const applicationRoutes=require('./routes/applicationRoutes');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());  


app.get('/', (req, res) => {
    res.send('API is working');
});


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB Connected');
    console.log(mongoose.connection.db.databaseName);

    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('Connection Error:', err));


app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobListRoutes);
app.use('/api/applications',applicationRoutes)