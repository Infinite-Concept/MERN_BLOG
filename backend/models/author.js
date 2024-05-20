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
        trim: true,
        unique: true
    },
    password: {
        require: true,
        type: String,
    },
    profession: {
        require: true,
        type: String,
        trim: true 
    },
    bio: {
        require: true,
        type: String,
    },
    social: {
        facebook: {
            require: true,
            type: String,
            trim: true 
        },
        instagram: {
            require: true,
            type: String,
            trim: true 
        },
        twitter: {
            require: true,
            type: String,
            trim: true 
        },
        linkedin: {
            require: true,
            type: String,
            trim: true 
        },
    },
    file: {
        require: true,
        type: String,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationToken: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("author", authorScheme)