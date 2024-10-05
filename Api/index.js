const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const roleRoute = require('./Routes/role.js')
const roleAuth = require('./Routes/auth.js')

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
app.use(express.json())
app.use('/api/role', roleRoute)
app.use('/api/auth', roleAuth)

// Server Connection
app.listen(PORT, ()=>{
    DataBase();
    console.log('Connected To Server')
})