# Firestore Security Rules 設計計畫

## 目前風險

目前 `orders` collection 使用 MVP 測試規則：

```js
allow read, write: if true;
```

這表示任何人都可以讀取與寫入訂單資料。此設定只適合 MVP 測試，不適合長期放在 production。

## 安全目標

- 顧客可以建立訂單。
- 只有登入的 admin 可以讀取 `orders`。
- 只有登入的 admin 可以更新訂單狀態。
- 其他 collection 預設拒絕讀寫。

## 暫時限制

- 目前還沒有真正的 admin role 判斷。
- 目前只能先用 `request.auth != null` 代表已登入者。
- 這代表 Phase 1 只能做到「需要登入」，還不能做到真正的 admin-only。

## 建議分階段

## Phase 1: auth-required admin rules

目標是先移除公開讀寫，改成：

- 顧客可以建立新訂單。
- 已登入使用者可以讀取訂單。
- 已登入使用者可以更新訂單狀態。
- 未登入使用者不能讀取訂單清單。

此階段的限制是：只要有 Firebase Auth 帳號就可能被視為 admin，因此仍不是最終安全設計。

## Phase 2: admin role rules

目標是升級為真正 admin-only：

- 建立 admin allowlist 或 custom claims。
- 只有具備 admin 身分的使用者可以讀取 orders。
- 只有具備 admin 身分的使用者可以更新訂單狀態。
- 顧客仍只能建立訂單，不能讀取或修改其他人的訂單。

## 下一階段

- 建立 admin allowlist 或 custom claims。
- 將 Firestore rules 從 `request.auth != null` 升級為真正 admin-only。
- 測試未登入、一般登入使用者、admin 使用者三種情境。
- 部署前先在本地或 Firebase Console Rules Playground 驗證規則。
