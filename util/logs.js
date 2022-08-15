const errorLog = (msg = 'Something bad happened !', error = null) => {
  console.log(
    '\x1b[31m%s\x1b[0m',
    `\n  ☠️\t- ${msg}`,
    JSON.stringify(error, null, 2)
  )
}

const infoLog = (msg = 'Some information !') => {
  console.log('\x1b[32m%s\x1b[0m', `\n  🚀\t- ${msg.trim()}`)
}

const warnLog = (msg = 'Something bad is gonna happen !') => {
  console.log('\x1b[33m%s\x1b[0m', `\n  ☣️\t- ${msg}`)
}

module.exports = { errorLog, infoLog, warnLog }
