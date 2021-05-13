const express = require('express');
const app = express();
//const path = require('path');

const PORT = process.env.PORT || 3000;
const connectDB = require('./config/db');
connectDB();

//Template engine if we want to use render
// app.set('views',path.join(__dirname,'/views'));
// app.set('view engine','ejs');

//This will allow all styles
//app.use(express.static('public')) // public is folder name
app.use(express.json()) // Used for telling that json data can also be come from user

//Routing the urls
app.use('/api/files',require('./routes/routeFiles'))

//Routing when we are comming with download link
app.use('/files',require('./routes/show'));

//Routing for download the file
app.use('/files/download',require('./routes/download'));

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});