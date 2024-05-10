const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    fullName: {
        require: true,
        type: String,
    },
    email: {
        require: true,
        type: String,
    },
    subject: {
        require: true,
        type: String,
    },
    message: {
        require: true,
        type: String,
    },
    dateCreate: {
        default: Date.now(),
        type: Date,
    }
})

module.exports = mongoose.model("contact", contactSchema)