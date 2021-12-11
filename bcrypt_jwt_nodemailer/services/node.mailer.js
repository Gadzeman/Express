const nodemailer = require('nodemailer');

module.exports = {
  sendMain: ( userMain ) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '',
        pass: ''
      }
    });

    return transporter.sendMail({
      from: 'No reply',
      to: userMain,
      subject: 'Subject',
      html: '<h1>You made request to get all users</h1>'
    });
  }
};
