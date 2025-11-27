import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || process.env.SMTP_HOST,
  port: parseInt(process.env.EMAIL_PORT || process.env.SMTP_PORT),
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || process.env.SMTP_USER,
    pass: process.env.EMAIL_PASSWORD || process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to, subject, html, text = '') => {
  try {
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS || process.env.SMTP_FROM}>`,
      to,
      subject,
      html,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
};

export const sendOTPEmail = async (to, otp) => {
  const subject = 'Your OTP Code - Aschik Project';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; text-align: center;">OTP Verification</h2>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="font-size: 16px; margin: 0 0 10px 0;">Hello,</p>
        <p style="font-size: 16px; margin: 0 0 20px 0;">
          Your One-Time Password (OTP) for verification is:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: bold; color: #007bff; background-color: #e9ecef; padding: 10px 20px; border-radius: 4px; letter-spacing: 3px;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #666; margin: 20px 0 0 0;">
          This OTP will expire in 10 minutes. Please do not share this code with anyone.
        </p>
        <p style="font-size: 14px; color: #666; margin: 10px 0 0 0;">
          If you didn't request this OTP, please ignore this email.
        </p>
      </div>
      <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #999;">
          This is an automated message from Aschik Project. Please do not reply to this email.
        </p>
      </div>
    </div>
  `;

  const text = `
    Hello,

    Your One-Time Password (OTP) for verification is: ${otp}

    This OTP will expire in 10 minutes. Please do not share this code with anyone.

    If you didn't request this OTP, please ignore this email.

    This is an automated message from Aschik Project.
  `;

  return await sendEmail(to, subject, html, text);
};

export default { sendEmail, sendOTPEmail };
