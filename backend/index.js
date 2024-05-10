const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors") 
require('dotenv').config()


// MongoDB connection
mongoose.connect('mongodb://localhost/blog', 
{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// router
const contact = require("./routes/contact")


const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const port = process.env.PORT

app.use("/contact", contact)


app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})