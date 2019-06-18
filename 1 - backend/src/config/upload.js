const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        // destination: function(req, file, cb) {
        //     cb(null, path.resolve(__dirname, '..', '..', 'uploads'))
        // },
        filename: function(req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
};