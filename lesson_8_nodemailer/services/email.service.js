const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');
const { NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD } = require('../config/variables');

const templateParser = new EmailTemplates({
  views: {
    root: path.join( process.cwd(), 'email.templates' )
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: NO_REPLY_EMAIL,
    pass: NO_REPLY_EMAIL_PASSWORD
  }
});

const sendMail = async (userMail) => {
  const html = await templateParser.render('welcome', { userName: 'Dimas' });

  return transporter.sendMail({
    from: 'No reply',
    to: userMail,
    subject: 'Subject',
    html
  });
};

module.exports = {
  sendMail
};
