import nodemailer from "nodemailer"

export const sendEmail = async()=>{

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
        user: "aya.h.abdelsamed@gmail.com",
        pass: "mtjrdlntsxxskhud",
        },
    });




    const info = await transporter.sendMail({
        from: '"Route Node.js 👻" <aya.h.abdelsamed@gmail.com>', // sender address
        to: "aya.abdelsamed11pp@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        html: "<b>Hello world from node.js course</b>", // html body
    });
    
    console.log("Message sent: %s", info.messageId);


}