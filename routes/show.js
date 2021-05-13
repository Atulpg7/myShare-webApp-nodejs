const router = require('express').Router();
const File = require('../models/file');

router.get('/:uuid', async (req, res)=>{ // : means its dynamic
    
    try{
        
        const file = await File.findOne({uuid: req.params.uuid}); // Find one means getting 1 data
        
        if(!file){ //If file not found
            return res.json({
                statusCode:404,
                status:'not_success',
                message:'Link has been expired'
            })
        }

        return res.json({
            statusCode:200,
            status:'success',
            uuid: file.uuid,
            filename: file.filename,
            filesize: file.size,
            downloadlink: `${process.env.APP_BASE_URL}files/download/${file.uuid}` //Eg:- http://localhost:3000/files/download/asdnuhuh127dza
        })

    }catch(err){
        return res.json({
            statusCode:500,
            status:'not_success',
            message:'Something went wrong'
        })

        //Alternatively we can use render to render any page
        //We need to configure ejs if we want to use render and add ejs dependency
    }
});

module.exports = router;