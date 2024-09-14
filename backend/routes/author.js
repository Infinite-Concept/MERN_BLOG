const router = require("express").Router()
const Joi = require("joi")
const multer = require("multer")
const AuthorDetails = require("../models/author")
const Author = require("../models/author")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const sendVerificationEmail = require("../lib/email")
const multerConfig = require("../lib/multer")
const jwt = require("jsonwebtoken")

const upload = multerConfig("uploads/authorPic/")
const secretKey = process.env.ACCESS_TOKEN_SECRET;

router.get("/", async(req, res) => {
    try {
        const authors = await AuthorDetails.find()
        res.json(authors)
    } catch (error) {
        res.status(500).json({message: "Error fetching authors"})
    }
})

const authorSchema = Joi.object({
    fullName: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(5).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().required().email(),
    profession: Joi.string().min(10).required(),
    facebook: Joi.string().min(10).required(),
    instagram: Joi.string().min(10).required(),
    twitter: Joi.string().min(10).required(),
    linkedin: Joi.string().min(10).required()
})

router.post("/register", upload.single('file'), async (req, res) => {

    try{

        const{error, value} = authorSchema.validate(req.body)

        if(error){
            res.status(404).json({ error: error.details[0].message })
        }

        // if (!req.file) {
        //     return res.status(400).json({ error: "File is required" });
        // }

        const existingUser = await Author.findOne({ email: value.email  });

        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(value.password, salt)

        if(!hashedPassword){
            return res.status(500).json({ message: "Internal server error" });
        } 

        const newUser = new Author({
            fullName: value.fullName,
            email: value.email,
            password: hashedPassword,
            profession: value.profession,
            social: {
                facebook: value.facebook,
                instagram: value.instagram,
                twitter: value.twitter,
                linkedin: value.linkedin,
            },
            file: req.file.path,
            verified: false
        })

        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        const savedUser = await newUser.save()

        let subject = `Confirm Your Email Address Click the following link to verify your email: http://localhost:3057/author/verify/${savedUser.verificationToken}`

        sendVerificationEmail(savedUser.email, "Email Verification", subject )

        res.status(201).json({ message: 'User registered successfully' });

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"})
    }
        
})

router.get("/verify/:token", async(req, res) => {
    try{

        const token = req.params.token

        const user = await Author.findOne({verificationToken: token});

        if(!user){
            res.status(400).json({message: "invalid token"})
        }

        user.verified = true
        user.verificationToken = undefined;
        await user.save()

        res.status(200).json({message: "verified successfully "})


    }catch(err){
        console.log(err);
        res.status(500).json({message: "email verification failed"})
    }
})

router.post("/login", async (req, res) => {
    try{

        const{ email, password} = req.body

        const user = await Author.findOne({email})

        if(!user){
            return res.json({
                status: false,
                message: "invalid email"})
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if(!validPassword){
            return res.json({
                status: false,
                message: "invalid email or password"})
        }

        if(!user.verified){
            return res.json({
                status: false,
                message: "Not a verified author"})
        }

        const accessToken = jwt.sign({email: user.email, userId: user._id}, secretKey, { expiresIn: '1h'})

        res.json({ 
            status: true,
            accessToken: accessToken })

    }catch(err){
        console.log(err);
        res.status(500).json({message: "unable to login user"})
    }
})

const verifyUser = async(req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ status: false, message: "No token provided" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: false, message: "Unauthorized" });
        }

        console.log(decoded);
        req.userId = decoded.userId
        next()
    })
}

router.get("/verifyAuthor", verifyUser, async (req, res) => {
    try {
        const user = await Author.findById(req.userId).select('-password');

        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        res.json({ status: true, user });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "unable to login user"})
    }
})

module.exports = router