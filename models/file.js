const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename: {type:String, required:true},// File Name
    path: {type:String, required:true}, //File path
    size: {type:Number, required:true},// File size
    sender: {type:String, required:false}, // If we choose send by email option then that will pass here
    uuid: {type:String, required:true},//For uniqueness, when we download the file eg if we choose 1,2 or 3 then I can download anyones file
    reciever: {type:String, required:false}  // If we choose send by email option then that will pass here
}, {timestamps:true});//CreatedAt and updatedAt will be generate

module.exports = mongoose.model('File',fileSchema);