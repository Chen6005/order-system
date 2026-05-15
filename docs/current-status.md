# 目前 Production 狀態

## 已完成功能重點

- 品牌已改為「廣東養生堂」。
- 顧客首頁主軸為「四季湯水・養生糖水」。
- 菜單分類已改為：
  - 四季湯水
  - 養生燉湯
  - 養生糖水
  - 養生茶飲
- 目前共有 8 個商品，且已支援 `season` 欄位與 SVG 商品圖片。
- 本季推薦功能已完成（最多顯示 3 個商品）。
- 季節篩選功能已完成（全部、春季、夏季、秋季、冬季、四季皆宜）。

## Firestore 與資料流

- `menuItems` 已建立 Firestore collection，且 8 個商品已完成 seed。
- 顧客首頁已改為從 Firestore `menuItems` realtime 讀取菜單。
- `mock-data` 目前仍保留，作為菜單 seed source。
- Checkout 會寫入 Firestore `orders` collection。
- 訂單管理支援 Firestore realtime 同步。

## 商品上下架管理（本次更新）

- Admin `/admin/menu` 已可查看 Firestore `menuItems`。
- Admin 可切換商品 `available` 狀態（下架 / 恢復供應）。
- 顧客首頁只顯示 `available === true` 的商品。
- 下架商品會從顧客首頁即時消失。
- 恢復供應後會即時回到顧客首頁。
- Production 已完成商品上下架 realtime flow 驗證。

## Admin 與權限

- Admin 後台路徑：`/admin`
- Admin 需先登入 Firebase Authentication。
- 只有登入且通過 allowlist 的帳號可看到訂單管理。
- 未登入或非 allowlist 狀態不會啟動 orders subscription。

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

