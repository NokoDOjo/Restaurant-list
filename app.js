// app.js
// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
const app = express()
const port = 3000

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
app.use(flash())


app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
// routes
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})