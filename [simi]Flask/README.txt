[20210506 update]
1. 獨立一個status.js 用來判斷 回傳status code要對應的alert
2. reset email頁面 input = email 設為必填
3. 更改部分sweet alert 背景顏色
4. 應該沒ㄌ 欸嘿(⁎⁍̴̛ᴗ⁍̴̛⁎)
5. 希望不要有side effect QQ

[資料夾與檔案說明]


│   README.txt                       [說明檔]
│   requirements.txt                 [Python環境需求]
│   run.py                           [程式執行檔]
│   
│   
│
│─lib
│  │ app_simi.py                      [網站request route]
│  │ login.py                         [登入主程式] - 含 註冊 登入 登出 重設token
│  │ reset.py                         [忘記密碼主程式] - 含 寄送郵件 更新密碼 
│  │ status.yml                       [http status code 說明檔]
│  
├─log                                 [執行log存放區]
│  │
│  │  login.log                       [紀錄登入相關的log]
│  │  reset.log                       [紀錄忘記密碼相關的log]
│  │  basic.log                       [紀錄操作資料庫相關的log]
│
├─utils                               [DB 相關]
│  │
│  │  mongodb_utils.py                [mongo db API的包裝]
│  │  basic.py                        [db 底層動作]
│
│
│
│
├─static                              [網頁用到的靜態資源]
│  │  
│  ├─ js                              [js檔案]
│  │  │  
│  │  │  product-page.js              [產品頁面js]
│  │  │  config.js                    [存放各網頁路徑的變數]
│  │  │  particlesjs-config.json      [背景特效參數設定]
│  │  │  loginpage_is_login.js        [登入頁面檢查access_token狀態]
│  │  │  login.js                     [登入頁面js]
│  │  │  signup.js                    [註冊頁面js]
│  │  │  reset.js                     [重設密碼頁面js]
│  │  │  is_login.js                  [登入後檢查access_token狀態]
│  │  │  logout.js                    [登出功能]
│  │  │  index2.js                    [關鍵字頻率分析圖表]
│  │  │  index2_1.js                  [文章情緒趨勢圖表]
│  │  │  index2_2.js                  [酒類評論情緒比例圖表]
│  │  │  index2_3.js                  [文章提及關鍵字趨勢圖表]
│  │  │  echarts-wordcloud.js         [關鍵字頻率文字雲圖表]
│  │  │  kol.js                       [kol模組頁面js]
│  │  │  outline.js                   [消費者輪廓模組頁面js]
│  │
│  ├─ css                             [css檔案]
│  │  │  
│  │  │  product-page.css             [產品頁面的css]
│  │  │  login2.css                   [登入+註冊頁面的css]
│  │  │  change-pass.css              [重設密碼頁面的css]
│  │  │  forget-pass.css              [忘記密碼頁面的css]
│  │  │  main.css                     [熱度趨勢頁面的css]
│  │  │  kol.css                      [kol模組頁面的css]
│  │  │  outline.css                  [消費者輪廓模組頁面的css]
│  │
│  ├─ img                             [圖片資源]
│  │  │  
│  │  │  bg-01.jpg                    [產品頁面聯絡我們section 表單title's 背景]
│  │  │  contact.jpeg                 [產品頁面聯絡我們section's背景]
│  │  │  detective.png                [產品頁面服務-消費者輪廓模組圖示]
│  │  │  leader.png                   [產品頁面服務-kol模組圖示]
│  │  │  trend.png                    [產品頁面服務- 熱度趨勢圖示]
│  │  │  linked-152575_640.png        [產品頁面landingpage's圖示]
│  │  │  logo.png                     [圖靈洞察logo]
│  │  │  pexels-pixabay-147413.jpg    [產品頁面landingpage's背景]
│  │  │  profile.png                  [kol模組user頭像]
│  │
├─templates                           [前端網頁]
│  │
│  │  product-page.html               [產品介紹頁面]
│  │  login.html                      [登入頁面]
│  │  signup.html                     [註冊頁面]
│  │  forget-pass.html                [找回密碼頁面]
│  │  reset.html                      [更改密碼頁面]
│  │  index.html                      [熱度趨勢頁面]
│  │  kol.html                        [kol模組頁面]
│  │  outline.html                    [消費者輪廓頁面]
│  │  
├─data    [資料集(暫時)]
│  │  
│  │  senti-ratio.json                [酒類評論情緒比例圖表資料集]
│  │  