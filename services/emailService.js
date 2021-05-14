const nodemailer = require('nodemailer');

async function sendMail({from, to, subject, text, html}){
    
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // we can use true then we have to change port to 465
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    let info = await transporter.sendMail({
        from: `myShare <${from}>`,
        to, subject, text, html
    });
}

module.exports = sendMail;