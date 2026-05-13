# 目前 MVP 狀態

## 目前已完成的功能

- 顧客可以在首頁瀏覽今日菜單。
- 顧客可以將餐點加入購物車。
- 購物車會顯示商品數量、小計與總金額。
- 顧客可以調整購物車內商品數量。
- 顧客可以送出訂單。
- 訂單會寫入 Firestore。
- 送出訂單後會顯示成功訊息並清空購物車。
- 頁面載入時會從 Firestore 讀取訂單。
- 訂單管理區塊可以顯示 Firestore 中的訂單。
- 訂單狀態更新會寫回 Firestore。
- orders collection 已支援 realtime sync。
- 兩個不同頁面可以即時同步新訂單與訂單狀態。
- 使用者介面已改為繁體中文。
- Vercel production 已部署成功。

## 目前資料狀態

目前訂單資料已接入 Firebase Firestore。

這表示：

- 顧客送出的訂單會儲存在 Firestore `orders` collection。
- 重新整理頁面後，訂單仍會從 Firestore 載入。
- 不同瀏覽器頁面可以透過 Firestore realtime listener 同步 orders。
- 訂單狀態變更會寫回 Firestore，並即時同步到其他已開啟頁面。
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

## 目前尚未包含的功能

- 顧客註冊與登入
- 管理員登入與權限控管
- 正式安全版 Firestore rules
- 線上付款
- 優惠券
- 多店鋪管理
- 外送追蹤
- 訂單通知
- 後台獨立頁面

## 下一階段建議

下一階段建議強化 Firebase integration，讓系統從 MVP 測試版走向更安全的 production-ready 架構。

建議優先處理：

- 加入 Firebase Authentication
- 建立管理員權限控管
- 收緊 Firestore rules，避免公開讀寫
- 將顧客端與管理端流程拆分得更清楚
- 增加訂單 loading、error 與 empty states
