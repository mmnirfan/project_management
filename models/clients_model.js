const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: {
        type: String,
        maxlength: 32
    },
    whatsappNo: {
        type: String,
        maxlength: 13,
        minlength: 10
    },
    email: {
        type: String,
        maxlength: 32
    },
    officeAddress: {
        type: String,
        maxlength: 52
    }
});


const clients = mongoose.model('Client', clientSchema);
module.exports = clients;