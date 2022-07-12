
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db.config');
const PORT = process.env.PORT;

connectDB();