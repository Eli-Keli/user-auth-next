/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bycriptjs from 'bcryptjs';


const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hashed token
        const hashedToken = await bycriptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }); // 1 hour expiry
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 }); // 1 hour expiry
        }


        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "09183098fad234",
                pass: "17221abb21ec1f"
            }
        });

        const mailOptions = {
            from: "muthokaelikeli@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: `
                <p>Click the link below to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}:</p>
                <a href="${process.env.DOMAIN}/${emailType == "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}">Click here</a>
                <p>or copy and paste the link below in your browser:</p>
                <p>${process.env.DOMAIN}/${emailType == "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}</p>
            `,
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error) {
        console.log(error);
    }
}

export default sendEmail;