const router = require('express').Router();
const File = require('../models/file');

router.get('/:uuid',async (req,res)=>{
    const file = await File.findOne({ uuid: req.params.uuid });
    
    //If file not foud in db
    if(!file){
        return res.json({
            statusCode:404,
            status:'not_success',
            message:'Link has been expired'
        });
    }

    const filePath = `${__dirname}/../${file.path}`;
    //We are getting file path as uploads/sadnks-nsajdnjad some we simply
    // going to main folder then redirecting to uploads

    res.download(filePath); // This will download the file
})

module.exports = router;