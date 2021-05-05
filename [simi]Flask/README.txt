[資料夾與檔案說明]


│   README.txt          [說明檔]
│   requirements.txt    [Python環境需求]
│   run.py              [程式執行檔]
│   
│   
│
│─lib
│   app_simi.py         [網站request route]
│   login.py            [登入主程式] - 含 註冊 登入 登出 重設token
│   reset.py            [忘記密碼主程式] - 含 寄送郵件 更新密碼 
│   status.yml          [http status code 說明檔]
│  
├─log                   [執行log存放區]
│  │
│  │  login.log         [紀錄登入相關的log]
│  │  reset.log         [紀錄忘記密碼相關的log]
│  │  basic.log         [紀錄操作資料庫相關的log]
│
├─utils                 [DB 相關]
│  │
│  │  mongodb_utils.py  [mongo db API的包裝]
│  │  basic.py         [db 底層動作]
│
│
│
│
|    │─ _static         [網頁用到的靜態資源]
|    │  |- js
|    │  |   ......js    [內容]
|    │  |- css
|    │  |- img
│    │ 
|    │ _templates       [前端網頁]
|    │  
|    │  
|    │  
|    │  