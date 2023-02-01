const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  // host: process.env.NODEMAILER_HOST,
  // port: process.env.NODEMAILER_PORT,
  // auth: {
  //   user: process.env.NODEMAILER_USER,
  //   pass: process.env.NODEMAILER_EMAIL_PASSWORD
  // }

  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_EMAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
})

module.exports = transporter
