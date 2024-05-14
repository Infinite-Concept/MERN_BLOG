const mongoose = require("mongoose")

const authorScheme = new mongoose.Schema({
    fullName: {
        require: true,
        type: String,
        trim: true 
    },
    email: {
        require: true,
        type: String,
        lowercase: true, 
        trim: true 
    },
    content: {
        require: true,
        type: String,
        trim: true 
    },
    social: {
        facebook: {
            require: true,
            type: String,
            trim: true 
        },
        twitter: {
            require: true,
            type: String,
            trim: true 
        },
        instagram: {
            require: true,
            type: String,
            trim: true 
        },
        linkedIn: {
            require: true,
            type: String,
            trim: true 
        },
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("author", authorScheme)