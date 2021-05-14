const File = require('./models/file')
const fs = require('fs');
const connectDB = require('./config/db');
connectDB().then(()=>{

    async function deleteExpiredFiles(){
        //24 hours
        const pastDate = new Date(Date.now() - (24 * 60 * 60 * 1000));
        const files = File.find({ createdAt: { $lt: pastDate} })
        
        if(files.length){
            for(const file of files){
                try{
                    //Remove from uploads folder
                    fs.unlinkSync(file.path);

                    //Deleting from database
                    await file.remove();
                    console.log(`Successfuly deleted ${file.filename}`);
                    
                }catch(err){
                    console.log(`Error while deleting file ${err}`);
                }
            }

            console.log(`Sucessfully deleted old files`)
        }
    }

    deleteExpiredFiles().then(()=>{
        console.log(`Exiting delete script`)
        process.exit();
    })
});