const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const keywordRegExp = new RegExp(keyword, 'i')
  const sortField = req.query.sortField || 'name';
  const sortOrder = req.query.sortOrder || 'asc';
  const sortObject = {};
  sortObject[sortField] = sortOrder;

  Restaurant.find({
    userId: req.user._id,
    $or: [
      { name: { $regex: keywordRegExp }}, 
      { category: { $regex: keywordRegExp }}
    ]
  })
    .sort(sortObject)
    .lean()
    .then( restaurants => res.render('index', { restaurants, keyword, sortField, sortOrder }))
    .catch(error => console.log(error))
})

module.exports = router