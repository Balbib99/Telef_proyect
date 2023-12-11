const {Schema, model} = require("mongoose");

const FileSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    file: {
        type: String
    },
    fileMetadata: {
        type: Object
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("File", FileSchema, "files");