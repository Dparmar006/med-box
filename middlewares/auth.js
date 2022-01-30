const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  let token = null
  token = req.body.token || req.headers['x-access-token']

  if (!token) {
    token = req.headers['authorization'].substring(
      req.headers['authorization'].indexOf(' ') + 1
    )
  }

  if (!token) {
    return res
      .status(403)
      .json({ sucess: false, msg: 'Authentication failed, please try again.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)
    req.pharmacist = decoded
  } catch (err) {
    return res
      .status(401)
      .json({ sucess: false, msg: 'Authorization failed, Please try again.' })
  }

  return next()
}

module.exports = verifyToken
