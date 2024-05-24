const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    content:{
        required: true,
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'author',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

})

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;