"use strict";
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const checkoutRouter = require('./routes/checkout.router');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use('/api/checkout', checkoutRouter);
app.get('/cancel', (req, res) => {
    res.redirect("http://localhost:4200/");
});
app.get('/success?', (req, res) => {
    const { fullName, email, amount } = req.query;
    console.log(fullName, email, amount);
    res.redirect("http://localhost:4200/");
});
app.listen(port, () => {
    console.log(`sever is listening at http://localhost:${port}`);
});
