const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error')
})
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
