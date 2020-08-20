// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const path = require('path');

// if(process.env.NODE_ENV !== 'production') require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 8080;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

// app.use(cors());//cross origin requests

// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname,'client/build/progressive-web-app-with-angular')));

//     app.get('*',function(req,res){
//         res.sendFile(path.join(__dirname,'client/build/progressive-web-app-with-angular','index.html'));
//     });
// }

// app.listen(port,error => {
//     if(error) throw error;
//     console.log('Server running on port ' + port);
// });

// server.js
const express = require("express");
const app = express();
const path = require("path");

const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(["https://", req.get("Host"), req.url].join(""));
    }
    next();
  };
};
app.use(forceSSL());
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + "/dist/progressive-web-app-with-angular"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/progressive-web-app-with-angular/index.html"));
});
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);
