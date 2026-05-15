# 目前 Production 狀態

## 已完成能力重點

- 品牌已改為「廣東養生堂」。
- 顧客首頁主軸為「四季湯水・養生糖水」。
- 菜單分類已改為：
  - 四季湯水
  - 養生燉湯
  - 養生糖水
  - 養生茶飲
- 商品已支援 `season` 欄位與 SVG 圖片。
- 本季推薦與季節篩選功能已完成。

## Firestore 與資料流

- Firestore `menuItems` collection 已建立並可穩定讀取。
- 顧客首頁已改為從 Firestore `menuItems` realtime 顯示菜單。
- Firestore `orders` collection 持續支援 checkout 寫入與 realtime 同步。
- `mock-data` 目前仍保留作為 seed source。

## Menu Management

- Admin `/admin/menu` 已支援查看 Firestore `menuItems`。
- 已支援新增商品（Create）。
- 已支援編輯商品（Update）。
- 已支援上下架商品（availability update）。
- 已支援封存商品（soft delete）。
- 封存商品會設定：
  - `archived: true`
  - `available: false`
- 顧客首頁只顯示 `available === true` 且 `archived === false` 的商品。
- menu management 已進入 CRUD 階段（目前已完成 Create / Read / Update 與 Soft Delete）。

## Order Workflow Sections（本次更新）

- Admin 訂單管理已分成三區：
  - 新訂單
  - 製作中
  - 已完成
- 新訂單會進入「新訂單」區塊。
- 狀態改為「製作中」後會移到「製作中」區塊。
- 狀態改為「已完成」後會移到「已完成」區塊。
- 本地驗證已通過。
- Production 已部署完成。

## Admin 與權限

- Admin 後台路徑：`/admin`
- Admin 需登入 Firebase Authentication。
- 只有登入且通過 allowlist 的帳號可查看管理內容。

## Production URL

https://order-system-ochre-one.vercel.app

## Production 環境變數

Vercel Production 已設定 Firebase Web SDK 需要的變數：

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## 目前尚未包含

- 顧客註冊與登入
- 線上付款
- 優惠券
- 多店鋪管理
- 外送追蹤
- 真正的 admin role / custom claims
