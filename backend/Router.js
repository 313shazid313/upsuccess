const express = require('express');
const router = express.Router();
const ModelSchema = require('./ModelSchema');
const path = require('path');
const multer = require('multer');

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images');
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(null, Date.now() + '-' + file.originalname.replace(extname, '') + extname);
  }
})
const upload = multer({ storage: storage })
//multer

router.post('/', upload.single('image'), async (req, res) => {
  const { filename } = req.file;
  const { name, price } = req.body;
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const ProductAdded = await ModelSchema.create({
      image: filename,
      name: name,
      price: price
    })
    res.status(201).json(ProductAdded)
  }
  catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
})



router.get('/',async (req, res)=>{
  try{
    const showAll = await ModelSchema.find();
    res.status(200).json(showAll);
  }
  catch(err){
    res.status(500).json({ error: error.message })
  }
})



module.exports = router;