const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const {v4: uuid4} = require('uuid');
const sendMail = require('../services/emailService');

//Creating object for storing the file in folder
let storage = multer.diskStorage({
    destination: (req,file,cb)=>cb(null,'uploads/'), // Setting the destination folder
    filename:(req,file,cb)=>{
        const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null,uniqueName); // Creating a unique file name and setting it
    }
});

//Creating object for upload file in storage
let upload = multer({
    storage,
    limits:{ fileSize: 1000000 * 100},// This is in bytes
}).single('myFile');// This should be same as sending from frontend

router.post('/',(req,res)=>{
        try{
                //Store file
                upload(req,res, async (err)=>{ //If we want to use await then async should added

                    //Validting request
                    if(!req.file){
                        return res.json({statusCode: 400, msg:"File required!"});
                    }

                    //Sending error if there is something wrong while saving the file
                    if(err){
                        return res.status(500).send({statusCode: 500, msg:err.message});
                    }

                    //Store file into database
                    const file = new File({
                        filename: req.file.filename,
                        uuid: uuid4(),
                        path:req.file.path,
                        size:req.file.size
                    });

                    //Respose download link
                    const response = await file.save();
                    return res.send( {
                        status:"success",
                        statusCode:"200",
                        message:"file_saved",
                        file:`${process.env.APP_BASE_URL}/files/${response.uuid}` // Eg:-> http://localhost:3000/files/snsabhjbadjhbzxradrtwqyeu
                    })
                });
        }catch(err){
            return res.send({statusCode:400, status:"not_success", message:err})
        }
});

router.post('/send', async (req, res)=>{
    
    const { uuid, emailTo, emailFrom } = req.body;
    
    //Validate request
    if(!uuid || !emailTo || !emailFrom){
        return res.status(422).send({statusCode:422, status:"not_success",message:"All fields are required for sending email"})
    }

    //Get data from database
    const file = await File.findOne({uuid: uuid});

    if(file.sender){
        return res.status(404).send({statusCode:404, status:"not_success",message:"Email already sent"})
    }

    file.sender = emailFrom;
    file.reciever = emailTo;

    const response = await file.save();

    //Send email
    const sendMail = require('../services/emailService');
    sendMail({
        from: emailFrom,
        to: emailTo,
        subject:"File shared through myShare",
        text:`${emailFrom} shared a file with you.`,
        html:require('../services/emailTemplate')({
            emailFrom: emailFrom,
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
            size: parseInt(file.size/1000) + ' KB',
            expires: '24 hours'
        }) // Email template ka jesa dikhega humara email
    })

    return res.send({statusCode:200, status:"success",message:"Email sent"});
})

module.exports = router;
