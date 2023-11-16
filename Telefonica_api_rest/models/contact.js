const {Schema, model} = require("mongoose");

const ContactSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("Contact", ContactSchema, "contacts");