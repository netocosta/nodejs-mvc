const mongoose = require('mongoose')

function connect() {
  // mongoose.set('useNewUrlParser', true)
  // mongoose.set('useUnifiedTopology', true)

  const SERVER = '127.0.0.1'
  const PORT = '27017'
  const DATABASE = 'projeto-mvc'
  mongoose.connect(`mongodb://${SERVER}:${PORT}/${DATABASE}?readPreference=primary&ssl=false`)

  const db = mongoose.connection

  db.once('open', () => {
    console.log('Connected to database!')
  })

  db.on('error', console.error.bind(console, 'Connection error: '))
}

module.exports = {
  connect
}