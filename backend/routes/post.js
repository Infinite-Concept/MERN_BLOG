const router = require("express").Router()
const BlogPost = require("../models/post")
const multerConfig = require("../lib/multer")

const upload = multerConfig("uploads/blogImage/")

router.post("/content", async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server internal error"})
    }
})