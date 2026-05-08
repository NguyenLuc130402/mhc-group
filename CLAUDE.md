# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Lệnh thường dùng

Cần chạy **2 process song song**:

```bash
# Terminal 1 — Express API (port 5000)
cd mhc-api
npm run dev        # dùng nodemon, tự restart khi sửa file
# hoặc
node server.js     # chạy một lần

# Terminal 2 — React app (port 3000)
cd mhc-app
npm start

# Build production
cd mhc-app && npm run build
```

Không có test suite ngoài mặc định của CRA. ESLint tích hợp sẵn trong CRA.

## Deployment

- **Backend** → Render.com (`https://mhc-api.onrender.com`)
- **Frontend** → Vercel (connect GitHub repo, root dir: `mhc-app`)
- API URL tự động chuyển theo môi trường qua env var:
  - `mhc-app/.env.development` → `REACT_APP_API_URL=http://localhost:5000/api`
  - `mhc-app/.env.production` → `REACT_APP_API_URL=https://mhc-api.onrender.com/api`
- Render free tier sleep sau 15 phút — dùng UptimeRobot ping `GET /api/tools` mỗi 5 phút để giữ awake

## Kiến trúc tổng quan

### Routing

Dùng **React Router v6** (`react-router-dom`). Cấu hình trong `mhc-app/src/App.js`:

```
/               → Home (src/pages/Home.js)
/reviews        → Trang Review tool (src/pages/Reviews.js)
/login          → Đăng nhập (src/pages/Login.js)
/register       → Đăng ký (src/pages/Register.js)
/tool/:id       → Chi tiết tool (src/pages/ToolDetail.js)
/admin          → Admin dashboard — ProtectedRoute
/admin/add      → Form thêm tool — ProtectedRoute
/admin/edit/:id → Form sửa tool — ProtectedRoute
```

`ProtectedRoute` trong `App.js` kiểm tra `isLoggedIn()` từ `src/utils/auth.js` — nếu chưa đăng nhập redirect về `/login`.

### Data layer — Express API + MongoDB Atlas

**Backend** (`mhc-api/`):
- `server.js` — Express server, port 5000
- `.env` — `MONGODB_URI`, `PORT`, `JWT_SECRET` (không commit)
- `data/tools.json` + `data/toolsDetail.json` — chỉ dùng để seed lần đầu

**API endpoints:**
```
POST   /api/auth/register          → đăng ký (username, email, password)
POST   /api/auth/login             → đăng nhập → trả JWT token 7 ngày
GET    /api/tools                  → công khai
POST   /api/tools                  → cần JWT
PUT    /api/tools/:id              → cần JWT
DELETE /api/tools/:id              → cần JWT + xóa detail tương ứng
GET    /api/tools/:id/detail       → công khai (tự generate nếu chưa có)
PUT    /api/tools/:id/detail       → cần JWT
POST   /api/upload                 → cần JWT, upload logo (multer, max 5MB)
```

**Frontend API layer** (`mhc-app/src/api/toolsApi.js`):
- Tất cả hàm async: `fetchTools`, `createTool`, `updateTool`, `deleteTool`, `fetchToolDetail`, `saveToolDetail`, `login`, `register`, `uploadLogo`
- Các hàm ghi (POST/PUT/DELETE) tự động đính kèm `Authorization: Bearer <token>` qua `authHeader()` từ `src/utils/auth.js`
- Base URL lấy từ `process.env.REACT_APP_API_URL`

**Auth utilities** (`mhc-app/src/utils/auth.js`):
- `saveAuth(token, username)` — lưu vào localStorage
- `clearAuth()` — xóa khi logout
- `isLoggedIn()` — dùng trong `ProtectedRoute`
- `authHeader()` — trả `{ Authorization: 'Bearer ...' }` để đính vào fetch

`mhc-app/src/data/toolsData.js` chỉ còn export `CATEGORIES` và `generateId()`.
`mhc-app/src/data/toolsDetail.js` chỉ còn `getEmptyDetail()`.

Khi data tool thay đổi, dispatch `new Event('mhc_tools_updated')` trên `window` — `ToolReviews` và `Admin` lắng nghe để re-fetch.

### Component ToolLogo

Export từ `mhc-app/src/components/ToolReviews/ToolReviews.js` (không phải file riêng), dùng lại ở Admin, AdminToolForm, ToolDetail, Reviews.

Các trường cấu hình logo: `logoBg`, `logoFill`, `logoText`, `logoShape` (`'rounded'|'circle'`), tùy chọn `logoBgFill`, tùy chọn `logoUrl` (ảnh upload — ưu tiên hơn text logo).

### Stats — Partner logos

Partner logos trong `Stats.js` dùng **Simple Icons CDN**: `https://cdn.simpleicons.org/{slug}/{hex_color}`. Mảng `PARTNERS` là array object `{ name, slug, color }`. CSS `filter: grayscale(1) opacity(0.45)` mặc định, hover `filter: none` để hiện màu brand. Kích thước cố định `28×28px` với `object-fit: contain`.

Stat "Lượt tiếp cận khách hàng" dùng `suffix: 'M+'` (không phải `'+'`).

### Button màu cam — quy tắc hiệu ứng

**Mọi** button có `background: #E85D2F` / `var(--color-accent)` phải có đầy đủ:
- `position: relative; overflow: hidden`
- `transition: background 0.2s, transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s`
- `::after` shimmer: `linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)` slide từ trái sang phải khi hover
- Hover: `transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,93,47,0.35)`
- Active: `transform: translateY(0); box-shadow: 0 4px 12px rgba(232,93,47,0.25)`

Button dùng class `.btn-primary` (global.css) đã có sẵn. Button có class riêng cần thêm thủ công.

### ⚠️ Known issue — Upload ảnh không persistent trên production

`POST /api/upload` dùng `multer.diskStorage` lưu file vào `mhc-api/uploads/` (local filesystem). Render.com free tier **không có persistent filesystem** — file bị xóa khi server restart. URL trả về cũng hardcode `http://localhost:PORT/...` (sai trên production). Cần migrate sang Cloudinary hoặc S3 trước khi dùng tính năng upload ảnh trên production.

### Design system

CSS custom properties định nghĩa trong `mhc-app/src/styles/variables.css`:

```
--color-accent:     #E85D2F  (cam — CTA, highlight)
--color-bg-dark:    #0D1117  (section tối)
--color-bg-muted:   #F5F5F5  (section phân cách)
--color-text-muted: #6B7280
--color-border:     #E5E7EB
--nav-height:       92px
```

Class button toàn cục `.btn-primary` / `.btn-secondary` trong `src/styles/global.css`. Nhãn section dùng class `.section-label`. Trang Login/Register dùng `src/pages/Auth.css` chung.

### Animation

Tất cả scroll-reveal dùng `framer-motion` `useInView` với `{ once: true }`. Pattern chuẩn:
```jsx
const ref = useRef(null);
const inView = useInView(ref, { once: true, margin: '-80px' });
<motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
```

Hover card dùng `whileHover={{ translateY: -5 }}`.

## Cấu trúc trang chủ (Home)

Thứ tự section: Navbar → Hero → **Intro** → Stats → Services → About → DarkFeature → Partners → Team → CTABanner → Footer → **ChatBubble**

ToolReviews đã tách ra trang riêng `/reviews`, không còn trên Home.

**Hero scroll:** nút mũi tên xuống dùng hàm `smoothScrollTo()` tự viết (easeInOutCubic qua `requestAnimationFrame`) thay vì `scrollIntoView` mặc định — mượt hơn và trừ đúng `--nav-height` để tránh bị che.

**Intro section** (`mhc-app/src/components/Intro/`): 2 cột — text+CTA trái, ảnh đội ngũ phải. `id="intro"` để Hero scroll đến. Ảnh dùng `aspect-ratio: 16/10`, hover có `translateY(-6px) scale(1.02)`. Locale keys dưới namespace `intro.*`.

## Trang Reviews (`/reviews`)

Thứ tự section:
1. **rv-hero** — hero section với heading split 5 locale keys (L1pre/L1accent/L1post, L2pre/L2accent), orbs + dot-grid, dark background
2. **FeaturedTool** — tự động lấy tool rating cao nhất từ API
3. **SearchBar** — tìm kiếm realtime, truyền `searchQuery` prop xuống ToolReviews
4. **ToolReviews** — nhận prop `searchQuery`; khi có query thì filter toàn bộ danh mục, ẩn tabs; khi rỗng thì hiện tabs theo danh mục
5. **GuideSection** — 3 block tips tĩnh
6. **RecommendSection** — 2 cột: ảnh (`src/assets/images/webinar-2.webp`) + 3 floating widget stats bên trái, 3 bước có số lớn màu nền mờ bên phải. Locale keys dưới namespace `reviews.recommend*`
7. **NewsletterSection** — form email (UI only)

CSS riêng: `mhc-app/src/pages/Reviews.css`

## Admin

Truy cập tại `localhost:3000/admin` — redirect về `/login` nếu chưa đăng nhập.

**Dashboard layout:**
- Stats row: 4 card có icon màu (Package/blue, FolderOpen/green, BarChart3/orange, Star/yellow)
- Mid row 2 cột: Quick Actions (trái, 320px) + Recent Products (phải, 5 tool mới nhất)
- Table bên dưới: liệt kê tool theo danh mục, lọc qua sidebar nav

**Admin sidebar nav:** gồm 6 mục danh mục + dấu phân cách + mục **Settings** ở cuối. Khi `navKey === 'settings'` thì ẩn stats, mid-row, table và hiển thị `SettingsPanel` thay thế.

**SettingsPanel** (component trong `Admin.js`):
- Gọi `useLang()` trực tiếp (khác `Confirm` — vì `SettingsPanel` được export ngoài và là component hợp lệ)
- Dropdown ngôn ngữ dùng `pendingLang` state — chỉ gọi `toggle()` khi nhấn "Lưu cài đặt", không áp dụng ngay
- Danger Zone có confirm 2 bước trước khi reset
- Locale keys nằm dưới namespace `settings.*`

**AdminToolForm** (`/admin/add`, `/admin/edit/:id`):
- Section **"Nhập nhanh bằng AI"** ở đầu cột trái — collapsible, màu cam
  - Copy prompt mẫu → paste JSON → nhấn **"Kiểm tra JSON"** (validate `name`, `category` ∈ CATEGORIES, `rating` 1–5) → nếu hợp lệ mới bật nút **"Import vào Form"**
  - Nút X góc trên phải textarea để xóa JSON nhanh
- **Validate trùng tên** khi submit thêm mới: fetch toàn bộ tools, so sánh tên case-insensitive — nếu trùng hiện lỗi đỏ dưới field tên, không submit
- Logo: upload ảnh (< 5MB) hoặc dùng text logo — bắt buộc có một trong hai
- **Danh mục bắt buộc chọn** (không có default), có option placeholder "-- Chọn danh mục --"
- Load data bằng `Promise.all([fetchTools(), fetchToolDetail(id)])`, có loading state
- Mọi thao tác thành công dispatch `new Event('mhc_tools_updated')`

## ChatBubble

`mhc-app/src/components/ChatBubble/ChatBubble.js` — widget cố định góc dưới phải, hiển thị trên Home, Reviews, ToolDetail (không có trên Admin).

- Nút tròn cam gradient, chấm xanh nhấp nháy, tự bounce nhẹ khi đóng
- Click mở panel với animation scale từ góc dưới phải (`transform-origin: bottom right`)
- Form: Họ tên, Email, Số điện thoại, Nội dung → giả lập gửi (setTimeout 1s) → màn hình thành công
- Gửi thật chưa kết nối backend — UI only
- Locale keys dưới namespace `chatbubble.*`

## Footer

Trên desktop: grid 4 cột. Trên mobile (≤480px): các nav col chuyển thành **accordion dropdown** — click heading để toggle, animation mượt dùng `max-height` + `opacity` transition.

## Hệ thống đa ngôn ngữ (VI/EN)

`LangProvider` bọc toàn bộ app trong `App.js`. Dùng `useLang()` hook để lấy `{ lang, toggle, t }`.

**Files:**
- `mhc-app/src/contexts/LangContext.js` — context, provider, `useLang()` hook
- `mhc-app/src/locales/vi.js` — bản dịch tiếng Việt
- `mhc-app/src/locales/en.js` — bản dịch tiếng Anh

**Cách dùng `t()`:** dot-notation, hỗ trợ trả về string, array, object:
```js
const { t } = useLang();
t('navbar.contact')            // → string
t('stats.items')               // → array [{label}]
t('navbar.serviceGroups')      // → array of objects
```

**Heading nhiều dòng:** khi heading cần xuống dòng theo thiết kế, tách thành nhiều locale keys (`headingL1`, `headingL2`, `headingL3`) rồi render với `<br />` trong JSX — không dùng `\n` trực tiếp trong string vì có thể bị wrap sai ở các viewport khác nhau. Ví dụ: `about.headingL1/L2/L3`, `reviews.heroL1pre/L1accent/...`.

**Pattern icon + text:** icons không thể để trong locale file (JSX), giữ icon trong mảng static trong component rồi zip với data từ `t()`:
```js
const ICONS = [<Icon1 />, <Icon2 />];
const items = t('section.items').map((item, i) => ({ ...item, icon: ICONS[i] }));
```

**Nút toggle ngôn ngữ** ở Navbar (hiện nhãn ngôn ngữ đối diện: đang VI thì hiện "EN"). Preference lưu vào localStorage key `mhc_lang`.

**Confirm dialog trong Admin:** là function component module-level, không thể gọi `useLang()` trực tiếp → nhận `t` làm prop từ component cha.

## Ngôn ngữ nội dung

Tiếng Việt cho body copy, tiếng Anh cho heading/label. Công ty: **MHC Group**, tagline: *We Don't Just Drive Traffic — We Drive Profit*, màu nhấn cam `#E85D2F`.

## Quy tắc làm việc

- Hỏi user trước khi chỉnh sửa bất kỳ file code nào
- Không để import hoặc biến không dùng (ESLint của CRA sẽ báo lỗi)
- Ảnh/screenshot lưu vào `C:/Users/Admin/Desktop/MHC-web/image/`
- Thinking và trả lời luôn bằng tiếng Việt
