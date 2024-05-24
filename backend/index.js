const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors") 
require('dotenv').config()
// router
const contact = require("./routes/contact")
const author = require("./routes/author")
const post = require("./routes/post")

const app = express()
app.use(cors())
const port = process.env.PORT

// MongoDB connection
mongoose.connect('mongodb://localhost/blog', {})
  .then(() => 
      app.listen(port, () => {
        console.log(`server is listening on port ${port}`);
    })
  )
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));



app.use("/contact", contact)
app.use("/author", author)
app.use("/post", post)

