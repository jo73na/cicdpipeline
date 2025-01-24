// const multer = require('multer');
// const path = require('path');

// const DIR = process.env.UPLOAD_PATH || "./uploads/";
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//     var d = new Date();
//     var randomName = d.getTime();
//     console.log(file.originalname); // Log file name
//     const fileName = file.originalname.toLowerCase().split(" ").join("-");
//     cb(null, fileName);
//   },
// });

// var upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     cb(null, true); // Allow all file types or add custom validation here
//   },
// });


// module.exports = upload;



/////////////////////

const multer = require('multer');
const DIR = process.env.UPLOAD_PATH || "./uploads/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    var d = new Date();
    var randomName = d.getTime();
      console.log(file.name);
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null,  fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
    // if (
    //   file.mimetype == "image/pdf" ||
    //   file.mimetype == "image/jpg" ||
    //   file.mimetype == "image/jpeg"
    // ) {
     
    // } else {
    //   cb(null, false);
    //   return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    // }
  },
});
module.exports = upload;