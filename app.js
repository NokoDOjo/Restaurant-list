// app.js
// require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const Restaurant = require('./models/restaurant')
// require handlebars in the project
const exphbs = require('express-handlebars')

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

// routes setting
app.get('/', (req, res) => {
  Restaurant.find()
    .lean() 
    .then( restaurants => res.render('index', { restaurants }) )
    .catch( error => console.log(error))
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find( restaurant =>
    restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword)||restaurant.category.includes(keyword)
  })
  res.render('index', {restaurants: restaurants})
})

app.get('restaurants/new', (req, res) => {
  return res.render('new')
})
// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})