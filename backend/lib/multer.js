const multer = require("multer")
const path = require("path")

const multerConfig = (fileStorage) => {
    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, fileStorage)
        },
        filename: function(req, file, cb){
            cb(null, Date.now() + path.extname(file.originalname))
        }
    })

    const upload = multer({ storage: storage });

    return upload;
}

module.exports = multerConfig