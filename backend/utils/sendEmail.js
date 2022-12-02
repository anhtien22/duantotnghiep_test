import nodeMailer from "nodemailer";

export const sendEmail = async (options) => {
  // const transporter = nodeMailer.createTransport({
  //   service: process.env.SMPT_SERVICE,
  //   auth: {
  //     user: process.env.SMPT_MAIL,
  //     pass: process.env.SMPT_PASSWORD,
  //   },
  // });

  // const mailOptions = {
  //   from: process.env.SMPT_MAIL,
  //   to: options.email,
  //   subject: options.subject,
  //   text: options.message,
  // };

  // await transporter.sendMail(mailOptions);
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    const res = await transporter.sendMail(mailOptions);
    if (res.id) {
      console.log("Thành công");
    }
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
};


// module.exports = sendEmail;