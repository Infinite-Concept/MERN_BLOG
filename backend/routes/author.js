const router = require("express").Router()
const mongoose = require("mongoose")
const Joi = require("joi")
const multer = require("multer")
const AuthorDetails = require("../models/author")
const Author = require("../models/author")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const sendVerificationEmail = require("../lib/email")


router.get("/", async(req, res) => {
    try {

        const authors = await AuthorDetails.find()
        res.json(authors)
        
    } catch (error) {
        res.status(500).json({message: "Error fetching authors"})
    }

})

const authorSchema = Joi.object({
    fullName: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(5).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().required().email(),
    profession: Joi.string().min(10).required(),
    facebook: Joi.string().min(10).required(),
    instagram: Joi.string().min(10).required(),
    twitter: Joi.string().min(10).required(),
    linkedin: Joi.string().min(10).required(),
    file: Joi.string().required()
})

router.post("/", async (req, res) => {

    try{

        const{error, value} = authorSchema.validate(req.body)

        if(error){
            res.status(404).json({ error: error.details[0].message })
        }

        let emailValue = value.email
        const existingUser = await Author.findOne({ emailValue });

        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(value.password, 10)

        if(!hashedPassword){
            return res.status(500).json({ message: "Internal server error" });
        }

        const newUser = new Author({
            fullName: value.fullName,
            email: value.email,
            password: value.password,
            profession: value.profession,
            social: {
                facebook: value.facebook,
                instagram: value.instagram,
                twitter: value.twitter,
                linkedin: value.linkedin,
            },
            file: value.file,
            verified: false
        })

        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        const savedUser = await newUser.save()

        let subject = `Confirm Your Email Address Click the following link to verify your email: http://localhost:3564/user/verify/${savedUser.verificationToken}`

        sendVerificationEmail(savedUser.email, "Email Verification", subject )

        res.status(201).json({ message: 'User registered successfully' });

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"})
    }
        
})


module.exports = router