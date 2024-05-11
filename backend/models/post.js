const mongoose = require("mongoose")

const postScheme = new mongoose.Schema({
    image: {
        require: true,
    },
    

})

module.exports = mongoose.model("post", postScheme)