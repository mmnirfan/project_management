const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
    name: {
        type: String,
        maxlength: 32
    },
    contact: {
        type: String,
        maxlength: 13,
        minlength: 10
    },
    whatsappNo: {
        type: String,
        maxlength: 13,
        minlength: 10
    },
    alternativeNo: {
        type: String,
        maxlength: 13,
        minlength: 10
    },
    email: {
        type: String,
        maxlength: 32
    },
    appExpress: {
        type: String,
        maxlength: 32
    }
});

function validateVendor(vendor) {
    const schema = {
        name: Joi.string().min(5).max(32).required(),
        whatsappNo: Joi.string().min(10).max(13).required(),
        contact: Joi.string().min(10).max(13).required(),
        alternativeNo: Joi.string().min(10).max(13).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }).required(),
        appExpress: Joi.string().min(5).max(255).required()
};
  
    return Joi.validate(vendor, schema);
}


const vendors = mongoose.model('Vendor', vendorSchema);
module.exports = vendors;
module.exports.validate = validateVendor;