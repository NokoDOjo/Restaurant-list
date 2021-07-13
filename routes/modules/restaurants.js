const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// Search route
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const keywordRegExp = new RegExp(keyword, 'i')
  Restaurant.find({
    $or: [{
      name: {
        $regex: keywordRegExp
      },
    }, {
      category: {
        $regex: keywordRegExp
      }
    }]
  })
    .lean()
    .then( restaurants => res.render('index', { restaurants, keyword }))
    .catch((error) => console.error(error))
})
// Add create route
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  if (!name || !category || !image || !location || !phone || !google_map || !rating || !description) {
    return res.render('new', { errorMsg })
  }
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// Add show details route
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})
// Add edit route
router.get('/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
