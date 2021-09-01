# Polish Demo 站

- 此為專案前測試技術用，並方便提供 demo，也可以作為臨時的靜態頁面生成器。
- 目前部署到 Heroku Node.js Server。

* node >= 12.16
* npm >= 6.13
* yarn >= 1.22

Clone the repository

```sh
 git clone https://github.com/polishdesigndev/polish-training-demo
 cd polish-training-demo
```

Install npm dependencies

```sh
 npm install
```

Run the dev-server

```sh
npm run serve
```

Build to `/dist` folder

```sh
npm run build
```

部署到 Heroku

```sh
git push heroku master
```

## Folder Structure

使用 gulp 為自動化工具

```
├── Procfile                         // Heroku Procfile
├── build                            // gulp 配置
│   ├── gulpfile.js
│   └── util.js
├── dist                             // build 後的靜態檔案
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── list
├── package-lock.json
├── package.json
├── server.js                        // Node server for heroku (靜態頁)
└── src                              // 原始碼
    ├── index.partial.html           // 總攬頁 partial，會自動注入到 index.template.html 中
    ├── index.template.html          // 總攬頁 template
    ├── script.js                    // 總攬頁 js
    ├── style.scss                   // 總攬頁 scss
    └── list                         // 列表，每一個資料夾為一組小 demo 頁面，按照時間排序
        ├── 1_Bitch                  // 1. 切版練習
        ├── 2_Polish_3D              // 2. Polish 官網首頁 3D 動畫
        ├── 3_Polish_Navbar          // 3. Polish 官網 Navbar
        ├── 4_TextHover_MouseTrail   // 4. Hover 效果測試
        ├── 5_Polish_Scroll          // 5. 水平滾動效果測試
        ├── 6_Object_Balls           // 6. Canvas 互動測試
        ├── 7_Asteroids              // 7. Canvas 互動測試
        ├── 8_i18n                   // 8. 語系翻譯測試
        ├── 9_mail_signature         // 9. Polish Email 簽名檔 HTML
        ├── 10_form_validation       // 10. 表單驗證
        ├── 11_mix_blend_mode        // 11. CSS mix-blend-mode 測試
        ├── 12_tensorflow            // 12. Tensorflow.js 測試，偵測照片人形輪廓並去背
        └── 13_ar                    // 13. FDPG AR 靜態頁面
```
