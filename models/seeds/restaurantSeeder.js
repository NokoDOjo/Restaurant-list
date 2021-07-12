const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

// 連線成功
// 載入餐廳資料
db.once('open', () => {
  for (let i = 0; i < restaurantList.length; i++) {
    Restaurant.create({ 
      ...restaurantList[i]
    })
  }
  console.log('mongodb connected! Restaurant data done !!')
})
