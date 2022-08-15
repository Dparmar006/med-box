module.exports = (successCode, message, ...data) => {
  res.status(successCode).json({
    message,
    data
  })
}
 