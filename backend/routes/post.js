const router = require("express").Router()
const BlogPost = require("../models/post")
const multerConfig = require("../lib/multer")

const upload = multerConfig("uploads/blogImage/")

router.post("/create", upload.single("file"), async (req, res) => {
    try {

        const { title, category, content } = req.body;
        const file = req.file;

        console.log(req.body);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server internal error"})
    }
})


module.exports = router