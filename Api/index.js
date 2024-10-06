const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const roleRoute = require('./Routes/role.js')
const authRoute = require('./Routes/auth.js')
const userRoute = require('./Routes/user.js')

// Activate express
const app = express();


// Activate dotenv
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;


// Database Connection
const DataBase = async ()=>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log('Connected to Database')
    } catch (error) {
        throw error;
    }
}


// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use('/api/role', roleRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute); 

// Response handler Middleware  (success and error)
app.use((obj, req, res, next) => {
    const statusCode = obj.statusError || obj.status || 500; // Handle both error and success cases
    const message = obj.messageError || obj.message || 'Something Went Wrong';
    const successStatusArr = [200, 201, 204];
    res.status(statusCode).json({
        success: successStatusArr.some(status => status === obj.status),
        status: statusCode,
        message: message,
        data: obj.data || null,  // Include data if it's a success
    });
});


// Server Connection
app.listen(PORT, ()=>{
    DataBase();
    console.log('Connected To Server')
})