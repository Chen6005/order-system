# 菜單擴充規則

## 新增商品時需要修改的檔案

新增商品時，通常只需要修改以下檔案：

- `lib/mock-data.ts`：新增商品資料。
- `public/images/`：新增商品圖片或 SVG placeholder。

如果只是新增既有分類下的商品，不需要修改 component、cart logic 或 checkout logic。

## MenuItem 必填欄位

每個商品都必須符合 `MenuItem` 型別，包含以下欄位：

- `id`：商品唯一識別碼，使用英文小寫與 hyphen。
- `name`：商品名稱，使用繁體中文。
- `description`：商品描述，需符合廣東養生堂的溫潤養生語氣。
- `price`：商品價格，使用數字。
- `category`：商品分類，必須使用可用分類值之一。
- `imageUrl`：商品圖片路徑。
- `available`：是否可供應，使用 `true` 或 `false`。

## Category 可用值

目前可用的 `category` 值與中文對應如下：

- `seasonalSoup`：四季湯水
- `herbalSoup`：養生燉湯
- `dessertSoup`：養生糖水
- `teaDrink`：養生茶飲

不要自行新增 category 字串。若需要新增分類，應先更新 `MenuCategory` type 與首頁分類顯示設定。

## imageUrl 命名規則

商品圖片放在 `public/images/`。

命名建議：

- 使用英文小寫。
- 單字之間使用 hyphen。
- 副檔名目前優先使用 `.svg`。
- `imageUrl` 使用 `/images/檔名.svg`。

範例：

```ts
imageUrl: "/images/lotus-root-pork-soup.svg"
```

## 新增商品後需要執行

新增或調整商品後，請執行：

```bash
npm run lint
npm run build
```

兩者都成功後再建立 commit。

## 不要直接修改的範圍

新增菜單商品時，不要直接修改：

- cart logic
- checkout logic
- Firestore order service
- admin order logic

菜單資料應保持獨立，避免因新增商品破壞既有下單流程。
