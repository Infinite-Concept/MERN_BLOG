const router = require("express").Router()
const mongoose = require("mongoose")
const AuthorDetails = require("../models/author")


router.get("/", async(req, res) => {
    try {

        const authors = await AuthorDetails.find()
        res.json(authors)
        
    } catch (error) {
        res.status(500).json({message: "Error fetching authors"})
    }

})

router.post("/", async (req, res) => {
        
})


module.exports = router