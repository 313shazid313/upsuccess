const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const router = require('./Router');
dotenv.config();
app.use(bodyParser.json());
app.use(cors());



mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log('connected');
    app.listen(process.env.PORT, (err) => {
      if (err)
        console.log(err);
      console.log(`running at ${process.env.PORT}`);
    })
  })
  .catch((error) => {
    console.log('failed', error)
  })


  app.use(router);
