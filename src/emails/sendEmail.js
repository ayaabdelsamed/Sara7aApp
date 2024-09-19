import nodemailer from "nodemailer"
import { emailTemplate } from "./emailTemplate.js";

export const sendEmail = async(email)=>{

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
        user: "aya.h.abdelsamed@gmail.com",
        pass: "mtjrdlntsxxskhud",
        },
    });




    const info = await transporter.sendMail({
        from: '"Route Node.js 👻" <aya.h.abdelsamed@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        html: emailTemplate(email), // html body
    });

    console.log("Message sent: %s", info.messageId);


}