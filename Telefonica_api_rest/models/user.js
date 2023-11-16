const {Schema, model} = require("mongoose");

const UserSchema = Schema({
    nick: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("User", UserSchema, "users");