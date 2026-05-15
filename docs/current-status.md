# 目前 Production 狀態

## 目前已完成的功能

- 品牌已改為「廣東養生堂」。
- 顧客首頁已調整為四季湯水與養生糖水方向。
- 首頁品牌文案為「四季湯水・養生糖水」。
- 菜單分類已改為：
  - 四季湯水
  - 養生燉湯
  - 養生糖水
  - 養生茶飲
- 目前共有 8 個商品。
- 商品資料已支援 `season` 欄位。
- 商品卡已支援 SVG 圖片。
- 本季推薦區塊已完成，目前推薦秋季與四季皆宜商品，最多顯示 3 個商品。
- 季節篩選已完成，可切換全部、春季、夏季、秋季、冬季與四季皆宜。
- 顧客可以將商品加入購物車。
- 購物車會顯示商品數量、小計與總金額。
- 顧客可以調整購物車內商品數量。
- 顧客可以送出訂單。
- Checkout 會將訂單寫入 Firebase Firestore。
- 送出訂單後會顯示成功訊息並清空購物車。
- Admin 後台位於 `/admin`。
- Admin 需要登入並通過 allowlist 才能看到訂單管理。
- 訂單管理可以讀取 Firestore orders。
- 訂單狀態更新會寫回 Firestore。
- orders collection 已支援 realtime sync。
- Vercel production 已部署並完成產品化版本驗證。

## 目前資料狀態

目前訂單資料已接入 Firebase Firestore。

這表示：

- 顧客送出的訂單會儲存在 Firestore `orders` collection。
- Checkout 仍可正常寫入 Firestore。
- Admin 登入後可從 Firestore 讀取訂單。
- 訂單列表透過 Firestore realtime listener 即時同步。
- 訂單狀態變更會寫回 Firestore，並同步到其他已開啟頁面。
- 購物車資料仍只存在目前瀏覽器頁面的 React state，重新整理後會清空。

## Production URL

https://order-system-ochre-one.vercel.app

## Production 環境設定

Vercel Production 已設定 Firebase Web SDK 需要的環境變數：

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## Admin 狀態

- Admin 後台路徑：`/admin`
- Admin 登入使用 Firebase Authentication。
- 只有登入且 email 在 allowlist 內的帳號可以看到訂單管理。
- 非 allowlist 帳號會看到無權限提示。
- 未登入或非 allowlist 狀態不會啟動 orders subscription。

## 目前尚未包含的功能

- 顧客註冊與登入
- 線上付款
- 優惠券
- 多店鋪管理
- 外送追蹤
- 訂單通知
- 真正 admin role / custom claims
- 更嚴格的 production Firestore security rules

## 下一階段建議

下一階段建議強化 Firebase security 與 admin 權限架構，讓系統從 MVP production 版本走向更完整的 production-ready 架構。

建議優先處理：

- 建立 admin allowlist 的後端驗證方式
- 升級為 Firebase custom claims 或正式 admin role
- 收緊 Firestore rules，避免只依賴前端 allowlist
- 增加訂單 loading、error 與 empty states
- 規劃正式商品圖片與商品管理流程
