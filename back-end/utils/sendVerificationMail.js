const { createMailTransporter } = require("./createMailTransporter");

const baseUrl = "http://localhost:5000";

const sendVerificationMail = (user) => {
  const transporter = createMailTransporter();

  const url = `http://localhost:5000/api/user/verify-email/${user.emailToken}`;

  const mailOptions = {
    from: '"Black Ph4nthom 👻" <msmuaz98@outlook.com>',
    to: user.Email, // list of receivers
    subject: "Verify Your Email ✔", // Subject line
    html: `<p>Hello ${user.Last_name},Verify your email by clicking this link...</p>
   <a  href=${url}>${url}</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("verification email sent");
    }
  });
};

module.exports = { sendVerificationMail };
