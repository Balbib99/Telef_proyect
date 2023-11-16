const {Schema, model} = require("mongoose");

const CtuSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    inc: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "Sin información"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("Ctu", CtuSchema, "ctus");