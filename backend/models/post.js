const mongoose = require("mongoose")

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        require: true,
    },
    category:{
        require: true,
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