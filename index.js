const config = require('config');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const mongoose = require('mongoose');
const clientRouter = require('./routes/clients');
const vendorRouter = require('./routes/vendors');
const projectRouter = require('./routes/projects');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const url = "mongodb://localhost/nodeJs_newDBex"
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}
  

mongoose.connect(url, {useNewUrlParser:true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log(err));

app.use(express.json());
app.use('/clients', clientRouter);
app.use('/vendors', vendorRouter);
app.use('/projects', projectRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

const port = process.env.PORT || 9000;
app.listen(port, function(){
    console.log(`Listening on port ${port}...`);
});