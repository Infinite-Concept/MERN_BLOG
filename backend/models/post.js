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
    mainImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content:{
        required: true,
        type: String
    },
    authorID: {
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

const Blog = new mongoose.model('BlogPost', blogPostSchema);

module.exports = Blog;