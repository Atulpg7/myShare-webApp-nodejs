const router = require('express').Router();
const User = require('../models/user');

router.get('/login',async (req,res)=>{
    try{
        const {email, password} = req.body;
        console.log(req.body)
        const user = await User.findOne({email,password});
        if(!user){
            res.send({"status":"not success","message":"no account exists"});    
        }

        res.send({"status":"success","email":user.email,"message":"login successfull"});
    }catch(err){
        return res.send({statusCode:400, status:"not_success",message:err})
    }
})

router.post('/signup',async (req,res)=>{
    try{
        const {firstname, lastname, email, password} = req.body;

        const user = await User.findOne({email,password});
        if(user){
            res.send({"status":"not success","message":"account already exists"});    
        }else{
            const user = new User({firstname,lastname,email,password});
            const response = await user.save();
            res.send({"status":"success","email":user.email,"message":"signup successfull"});
        }
    }catch(err){
        return res.send({statusCode:400, status:"not_success",message:err})
    }
})

module.exports = router;