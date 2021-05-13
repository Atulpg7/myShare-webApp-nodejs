require('dotenv').config();
const mongoose = require('mongoose');

//Function to connect to database
function initDBConnection() {

    mongoose.connect(process.env.MONGOOSE_CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    const connection = mongoose.connection;

    connection.once('open',()=>{
        console.log('DB Connected');
    }).catch(err=>{
        console.log('DB Not Connected');
    })
    
}

module.exports = initDBConnection;