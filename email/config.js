const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_EMAIL_PASSWORD
  }
})

module.exports = transporter
