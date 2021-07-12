// app.js
// require packages used in the project
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/restaurant')  //載入restaurant model
const exphbs = require('express-handlebars')

const routes = require('./routes')
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
// Body-parser
app.use(express.urlencoded({ extended: true }))
// Method override
app.use(methodOverride('_method'))
// routes
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})