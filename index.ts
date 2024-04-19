require('dotenv').config();
const express = require('express');
const cors = require('cors')

const _sequelize = require('./config/db');
const checkoutRouter  = require('./routes/checkout.router');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.use('/api/checkout', checkoutRouter);



_sequelize.sync()
    .then(
        () => {
            console.log('database connected');
            app.listen(port, () => {
                console.log(`sever is listening at http://localhost:${port}`);
            });
        }
    ).catch((err:any)=>{
        console.log("error in connecting db" ,err);
    })
