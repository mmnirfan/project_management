const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const mongoose = require('mongoose');
const clientRouter = require('./routes/clients');
const vendorRouter = require('./routes/vendors');
const projectRouter = require('./routes/projects');
const url = "mongodb://localhost/nodeJs_newDBex"
const app = express();

mongoose.connect(url, {useNewUrlParser:true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log(err));

app.use(express.json());
app.use('/clients', clientRouter);
app.use('/vendors', vendorRouter);
app.use('/projects', projectRouter);

const port = process.env.PORT || 9000;
app.listen(port, function(){
    console.log(`Listening on port ${port}...`);
});