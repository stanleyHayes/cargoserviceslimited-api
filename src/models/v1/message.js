const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw Error(`Invalid email: ${value}`);
            }
        }
    },
    phone: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw Error(`Invalid phone number: ${value}`);
            }
        }
    },
    text: {
        type: String,
        required: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
