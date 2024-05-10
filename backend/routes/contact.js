const router = require("express").Router()
const mongoose = require("mongoose")
const Joi = require('joi');
const Contact = require("../models/contact")
const sendVerificationEmail = require("../lib/email")

router.post("/form/data", async(req, res) => {
    try {
        const schema = Joi.object({
            fullName: Joi.string().min(3).max(50).required(),
            email: Joi.string().email().required(),
            subject: Joi.string().min(3).max(50).required(),
            message: Joi.string().min(10).max(500).required()
        });

        const { error } = schema.validate(req.body);

        if(error){
            return res.status(400).send(error.details[0].message)
        }

        const contactInfo = new Contact({
            fullName: req.body.fullName,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
        })

        await contactInfo.save();

        // Send email to client
        await sendVerificationEmail(req.body.email, 'Message Sent Successfully!', 'Your message has been successfully sent.');

        await sendVerificationEmail('ifenowoifesegun@gmail.com', 'New Message Received', ` ${req.body.subject} \n\n\n ${req.body.message}`);

        res.status(200).json({message : 'Message sent successfully!'})

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "server error"})
    }


})

module.exports = router