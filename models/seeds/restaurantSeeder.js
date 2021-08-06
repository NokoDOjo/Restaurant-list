const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const User = require('../user')
const userList = require('../../user.json').results
const db = require('../../config/mongoose')


// 連線成功
// 載入餐廳資料
db.once('open', () => {
  userList.forEach( seedUser => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash =>
        User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        }))
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
        seedUser.ownedRestaurantID, 
        id => Restaurant.create({ ...restaurantList[id-1], userId })
        ))
      })
      .then(() => {
        console.log('done.')
        process.exit()
      })
      .catch(error => console.log(error))
  })
})
