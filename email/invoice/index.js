const nodemailer = require('nodemailer')
const transporter = require('../config')
const ejs = require('ejs')
const { errorLog, infoLog } = require('../../util/logs')
const path = require('path')
const res = require('express/lib/response')
// const html = require('./template')

const sendInvoiceToCustomer = (
  options = {
    to: 'parmarkrunal09101@gmail.com',
    from: process.env.NODEMAILER_EMAIL,
    subject: 'Invoice for your order numbered : XXX001',
    html: 'html'
  },
  data
) => {
  let userData = {
    ...data
  }
  console.log('-----------------\n ', userData)
  let filePath = path.join(__dirname, 'invoice.ejs')

  ejs.renderFile(filePath, { userData }, (err, data) => {
    if (err) {
      errorLog(err)
    } else {
      let emailOptions = { ...options, html: data }
      transporter.sendMail(emailOptions, (err, info) => {
        if (err) return errorLog(err.message)
        infoLog(`Email sent to ${options.to}`, info.response)
      })
    }
  })
}

module.exports = sendInvoiceToCustomer
