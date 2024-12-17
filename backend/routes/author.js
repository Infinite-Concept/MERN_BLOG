const router = require("express").Router()
const multer = require("multer")
const AuthorDetails = require("../models/author")
const Author = require("../models/author")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const sendVerificationEmail = require("../lib/email")
const multerConfig = require("../lib/multer")
const jwt = require("jsonwebtoken")
const {authorPassword, authorSchema, updateAuthor} = require('../validation/joi')

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

router.post("/register", upload.single('file'), async (req, res) => {

    try{

        const{error, value} = authorSchema.validate(req.body)

        if(error){
            return res.json({
                status: false,
                message: error.details[0].message })
        }

        if (!req.file) {
            return res.json({status: false, message: "File is required" });
        }

        const existingUser = await Author.findOne({ email: value.email  });

        if (existingUser) {
            return res.json({status: false, message: "Email already registered" });
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
            bio: value.bio,
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

        res.json({ status: true, message: 'User registered successfully' });

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
            accessToken: accessToken,
            message: user
         })

    }catch(err){
        console.error(err);
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
        req.userId = decoded.userId
        next()
    })
}

router.get("/verifyAuthor", verifyUser, async (req, res) => {
    try {
        const user = await Author.findById(req.userId).select('-password -forgetToken -verified');

        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        res.json({ status: true, user });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error. Try again later"})
    }
})

router.post("/forgot-password", async (req, res) => {
    try {

        const{email} = req.body

        const user = await Author.findOne({email})
        
        if(!user){
            return res.json({
                status: false,
                message: "User do not exit"
            })
        }

        user.forgetToken = crypto.randomBytes(20).toString("hex");

        const savedUser = await user.save()

        let subject =
        `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` 
        +`Click the following link to reset your email: http://localhost:3000/reset-password/${savedUser.forgetToken} \n\n\n\n`
        + `If you did not request this, please ignore this email and your password will remain unchanged.\n`

        sendVerificationEmail(savedUser.email, "Password Reset Confirmation", subject )

        res.json({ 
            status: true,
            message: 'Password Reset' });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error. Try again later"})
    }
})

router.post("/reset-password", async(req, res) => {
    try{
        const {password, token} = req.body

        const user = await Author.findOne({forgetToken: token});

        if(!user){
            return res.json({
                status: false,
                message: "invalid token"})
        }

        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, genSalt)
        if(!hashedPassword){
            return res.status(500).json({message: "internal server error"})
        }

        user.password = hashedPassword
        user.forgetToken = undefined;
        await user.save()

        res.json({
            status: true,
            message: "Password reset successfully "})

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error. Try again later"})
    }
})

router.put("/profile", upload.single('file'), async (req, res) => {
    try{
        const{error, value} = updateAuthor.validate(req.body)

        if(error){
            return res.json({
                status: false,
                message: error.details[0].message })
        }

        const existingUser = await Author.findOne({ _id: value.id });

        if (!existingUser) {
            return res.json({status: false, message: "No user found" });
        }
        
        // Update the user's data
        existingUser.fullName = value.fullName || existingUser.fullName;
        existingUser.profession = value.profession || existingUser.profession;
        existingUser.bio = value.bio || existingUser.bio;
        existingUser.social = {
            facebook: value.facebook || existingUser.social.facebook,
            instagram: value.instagram || existingUser.social.instagram,
            twitter: value.twitter || existingUser.social.twitter,
            linkedin: value.linkedin || existingUser.social.linkedin,
        };
        if (req.file) {
            existingUser.file = req.file.path;
        }

        await existingUser.save()

        res.json({ status: true, message: 'Profile successfully changed', user : existingUser});

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"})
    }
        
})

router.put("/password", async (req, res) => {
    try{
        const{error, value} = authorPassword.validate(req.body)

        if(error){
            return res.json({
                status: false,
                message: error.details[0].message })
        }

        const existingUser = await Author.findOne({ _id: value.id });

        if (!existingUser) {
            return res.json({status: false, message: "no user found" });
        }

        let OldPassword = await bcrypt.compare(value.old_password, existingUser.password)
        if(!OldPassword){
            return res.json({
                status: false,
                message: "invalid password"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(value.password, salt)

        if(!hashedPassword){
            return res.status(500).json({ message: "Internal server error" });
        } 
        
        existingUser.password = hashedPassword

        await existingUser.save()

        res.json({ status: true, message: 'Password successfully changed'});

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"})
    }
        
})

module.exports = router