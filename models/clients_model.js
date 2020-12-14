const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: {
        type: String,
        maxlength: 32,
        required: true
    },
    whatsappNo: {
        type: String,
        maxlength: 13,
        minlength: 10,
        required: true
    },
    email: {
        type: String,
        maxlength: 32,
        required: true
    },
    officeAddress: {
        type: String,
        maxlength: 52
    }
});

function validateClient(client) {
    const schema = {
        name: Joi.string().min(5).max(32).required(),
        whatsappNo: Joi.string().min(10).max(13).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }).required(),
        officeAddress: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(client, schema);
}


const clients = mongoose.model('Client', clientSchema);
module.exports = clients;
module.exports.validate = validateClient;