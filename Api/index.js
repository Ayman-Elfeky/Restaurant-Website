const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

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

// Server Connection
app.listen(PORT, ()=>{
    DataBase();
    console.log('Connected To Server')
})