import express from "express";
import multer from "multer";
import sgMail from "@sendgrid/mail";

const router = express.Router();
const upload = multer();
sgMail.setApiKey(process.env.MAIL_API!)

/* POST contact form. */
router.post('/', upload.none(), async function (req, res, next) {
    const { name, email, message } = req.body;

    const msg = {
        to: "leo.cf.tian@gmail.com", // Change to your recipient
        replyTo: email,
        from: "leo.cf.tian.info@gmail.com",
        subject: `Contact Request from ${name}`,
        text: message,
    }

    // const notification = {
    //     to: email, // Change to your recipient
    //     replyTo: "leo.cf.tian@gmail.com",
    //     from: "leo.cf.tian.info@gmail.com",
    //     subject: `Contact Request from ${name}`,
    //     html: `
    //         <h1>Hello! </h1>
    //     `
    // }

    try {
        // sgMail.send(msg);
        res.status(200);
        res.send("success!");
    }
    catch (error) {
        res.status(500)
        res.send("failure...");
        return;
    }
});

export default router;