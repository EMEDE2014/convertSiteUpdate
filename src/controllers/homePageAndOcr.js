const multer = require('multer');
const fs = require('fs');
const tesseract = require("node-tesseract-ocr");

const storage = multer.diskStorage({
  destination: (req, file,cb) =>{
    cb(null, "public/assets/uploads");
  },
  filename: (req, file,cb) => {
    cb(null, file.originalname);
  }
})

const upload = multer({storage: storage}).single('avatar');

exports.homePageOcr = (req, res, next) =>{
res.render('index', {data:'', title: 'Home'});

next();
}

exports.receiveFileHomeOcr = (req, res) => {
    upload(req, res, err => {
        fs.readFile(`public/assets/uploads/${req.file.originalname}`, (err, data) => {
         if(err) return console.log('This is your error', err);
   
 
const config = {
     lang: "eng+rus+fr+script/Arabic+frm+chi_sim+spa+script/Armenian+script/Bengali+script/Canadian_Aboriginal+script/Cherokee+script/Cyrillic+script/Devanagari+script/Fraktur+script/Georgian+script/Greek+script/Japanese+script/Japanese_vert+script/Lao+script/Latin+script/Malayalam+script/Tamil+script/Vietnamese+tur+spa+por+chi_sim+chi_sim_vert",
     oem: 3,
     psm: 1,
   }
 
 tesseract
   .recognize(data, config)
   .then((text) => {
    //  console.log("Result:", text)
     res.render('index', {data:`${text}<br/>`, title:'Converted'}); 
     fs.rm(`public/assets/uploads/${req.file.originalname}`, (err, data) => {
      if(err) return console.log('The file is note delete!', err);
     });

   })
   .catch((error) => {
     console.log(error.message)
   })
 
     });
 
     });
}


