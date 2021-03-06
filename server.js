const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());//cross origin requests

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'client/build/progressive-web-app-with-angular')));

    app.get('*',function(req,res){
        res.sendFile(path.join(__dirname,'client/build/progressive-web-app-with-angular','index.html'));
    });
}

app.listen(port,error => {
    if(error) throw error;
    console.log('Server running on port ' + port);
});
