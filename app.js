// app.js
// require packages used in the project
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/restaurant')  //載入restaurant model
const exphbs = require('express-handlebars')

const routes = require('./routes')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

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