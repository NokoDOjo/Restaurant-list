# AC FOODIE
一個用 Express 所建立簡單的餐廳清單網頁

## 功能介紹
- 在首頁瀏覽所有餐廳與它們的簡單資料，包含餐廳照片、名稱、分類、評分
- 可以點擊Detail或餐廳圖卡進去看餐廳的詳細資訊，包含類別、地址、電話、描述、圖片
- 可以根據餐廳名稱或分類來搜尋到特定的餐廳
- 可以按下 + 圖卡進入新增頁面來添加新的餐廳
- 可以新增、修改、刪除餐廳的資訊
- 可以在首頁更改餐廳的排序方式(名稱、類別、評分)
- 使用者可以註冊帳號或是用 Facebook & Google Login 直接登入，建立並管理專屬他的一個餐廳清單



## 環境建置 Environment Setup

1. nvm & Node.js & Express
2. mongoose
3. mongodb
4. Robo 3T
5. bootswatch
6. Font awesome

## 安裝 Installing

1. 在終端機輸入指令 Clone 此專案至本機電腦
```
git clone https://github.com/NokoDOjo/Restaurant-list.git
```
2. 進入專案目錄
```
cd Restaurant-list
```
3. 安裝相關套件
```
npm install
```
4. 設定環境變數

將檔案 .env.example 檔名改為 .env
若要使用 facebook login ，則需要先在 [Facebook for Developers](https://developers.facebook.com/?locale=zh_TW) 中建立應用程式，將應用程式編號和密鑰填入 .env，即可使用 facebook login 功能。

若要使用 google login ，則需要先在 [google api](https://console.cloud.google.com/apis) 中建立應用程式，將用戶端ID和密鑰填入 .env，即可使用 google login 功能。

5. 啟動種子資料
```
npm run seed
```
6. 啟動專案
```
npm run dev
```
7. 出現以下訊息後，即可在 http://localhost:3000 開始使用
```
Express is listening on localhost:3000
```


