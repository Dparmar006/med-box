const errorLog = (msg = 'Something bad happened !') => {
  console.log('\x1b[31m%s\x1b[0m', `\n  ::> ${msg}`)
}

const infoLog = (msg = 'Some information !') => {
  console.log('\x1b[32m%s\x1b[0m', `\n  ::> ${msg}`)
}

const warnLog = (msg = 'Something bad is gonna happen !') => {
  console.log('\x1b[31m%s\x1b[0m', `\n  ::> ${msg}`)
}

module.exports = { errorLog, infoLog, warnLog }
