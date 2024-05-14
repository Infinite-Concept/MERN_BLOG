const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors") 
require('dotenv').config()
// router
const contact = require("./routes/contact")
const author = require("./routes/author")



const app = express()


// MongoDB connection
mongoose.connect('mongodb://localhost/blog', {})
  .then(() => 
      app.listen(port, () => {
        console.log(`server is listening on port ${port}`);
    })
  )
  .catch(err => console.error('Could not connect to MongoDB', err));


app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const port = process.env.PORT

app.use("/contact", contact)
app.use("/author", author)
