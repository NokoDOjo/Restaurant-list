// app.js
// require packages used in the project
const express = require('express')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

const routes = require('./routes')
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: '12345',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public'))
// Body-parser
app.use(express.urlencoded({ extended: true }))
// Method override
app.use(methodOverride('_method'))

usePassport(app)
// routes
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})