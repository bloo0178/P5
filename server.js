'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
})
var upload = multer({storage: storage}).single('upfile');

var app = express();

app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.json({name: req.file.originalname, type: req.file.mimetype, size: req.file.size});
    }
  })
  
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});


/*
  <form enctype="multipart/form-data" method="POST" action="/api/fileanalyse">
            <input id="inputfield" type="file" name="upfile">
            <input id="button" type="submit" value="Upload">
            

  {"name":"P4 Log.png","type":"image/png","size":16214}
*/