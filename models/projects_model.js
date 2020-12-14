const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        maxlength: 52
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    },
    actualCost: {
        type: String
    },
    vendorCost: {
        type: String
    },
    advance: {
        type: String
    },
    months: {
        type: String
    },
    deadline: {
        type: String
    }
});

function validateProject(project) {
    const schema = {
        name: Joi.string().min(5).max(52).required(),
        client: Joi.objectId().required(),
        vendor: Joi.objectId().required(),
        actualCost: Joi.string(),
        vendorCost: Joi.string(),
        advance: Joi.string(),
        months: Joi.string(),
        deadline: Joi.string()
    };
  
    return Joi.validate(project, schema);
}
const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
module.exports.validate = validateProject;