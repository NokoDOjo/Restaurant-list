const express = require('express')
const mongoose = require('mongoose')
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
  if (!mongoose.Types.ObjectId.isValid(id)) return res.redirect('back')
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})
// Add edit route
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) return res.redirect('back')
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) return res.redirect('back')
  const editRestaurant = req.body

  return Restaurant.findById(id)
    .then((restaurant) => {
      Object.assign(restaurant, editRestaurant)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
// Add delete route
router.delete('/:id', (req, res) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) return res.redirect('back')
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
