// app.js
// require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/restaurant')  //載入restaurant model
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

// Search route
app.get('/restaurants/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      if (keyword) {
        restaurants = restaurants.filter(
          (restaurant) =>
            restaurant.name.toLowerCase().includes(keyword) ||
            restaurant.category.includes(keyword)
        )
        return res.render('index', {
          restaurants, keyword: req.query.keyword.trim()
        })

      }
      if (restaurants.length === 0) {
        console.log('restaurants.length', restaurants.length)
        res.render('index', {
          keyword: req.query.keyword,
          no_result: `<h3> 沒有"${req.query.keyword}"的搜尋結果，請輸入正確的餐廳名稱</h3>`,
        })
      }
    })
    .catch((error) => console.error(error))
})
// Add create route
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  if (!name || !category || !image || !location || !phone || !google_map || !rating || !description) {
    return res.redirect('/restaurants/new')
  }
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// Add show details route
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})
// Add edit route
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const editRestaurant = req.body

  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = editRestaurant.name
      restaurant.name_en = editRestaurant.name_en
      restaurant.category = editRestaurant.category
      restaurant.image = editRestaurant.image
      restaurant.location = editRestaurant.location
      restaurant.phone = editRestaurant.phone
      restaurant.google_map = editRestaurant.google_map
      restaurant.rating = editRestaurant.rating
      restaurant.description = editRestaurant.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
// Add delete route
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})