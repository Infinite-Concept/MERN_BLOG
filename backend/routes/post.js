const router = require("express").Router()
const Blog = require("../models/post")
const Author = require("../models/author")
const mongoose = require("mongoose")
const multerConfig = require("../lib/multer")

const upload = multerConfig("uploads/blogImage/")

router.get("/getAll", async (req, res) => {
    try {
        let blog = await Blog.find()
        res.status(200).json({blog})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error. Try again later"})
    }
})

router.post("/create", upload.single("file"), async (req, res) => {
    try {
        const { title, category, content, description, userId} = req.body;
        const file = req.file;

        if (!file) {
            return res.json({ 
                status: false,
                message: "File is required" });
        }
        const authorId = mongoose.Types.ObjectId.createFromHexString(userId);

        let author = await Author.findOne(authorId)

        if(!author){
            return res.json({ 
                status: false,
                message: "Author not found" });
        }
        
        const newBlog = new Blog({
            title,
            category,
            content,
            description,
            authorID: userId,
            mainImage: file.path 
        });

        await newBlog.save()
        
        res.json({
            status: true,
            message: "Blog post created successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error. Try again later"})
    }
})

router.get("/author_Blog", async (req, res) => {
    try {
        const {userId} = req.body;

        const authorId = mongoose.Types.ObjectId.createFromHexString(userId);

        let author = await Blog.find({authorId})

        if(!author){
            return res.json({ 
                status: false,
                message: "Author not found" });
        }
        
        res.json({
            status: true,
            message: author
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error. Try again later"})
    }
})

// router.put("/update", upload.single("file"), async (req, res) => {
//     try {
//         const { title, category, content, id} = req.body;
//         const file = req.file;
//         if (!file) {
//             return res.json({ 
//                 status: false,
//                 message: "File is required" });
//         }

//         const authorId = mongoose.Types.ObjectId.createFromHexString(userId);

        
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "Internal server error. Try again later"})
//     }
// })

router.post("/delete", async (req, res) => {
    try {
        const { userId} = req.body;

        const authorId = mongoose.Types.ObjectId.createFromHexString(userId);

        await Author.findByIdAndDelete(authorId)
        
        res.json({
            status: true,
            message: "Blog post deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error. Try again later"})
    }
})

module.exports = router