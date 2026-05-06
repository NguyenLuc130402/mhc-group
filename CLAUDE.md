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

### Design system

CSS custom properties định nghĩa trong `mhc-app/src/styles/variables.css`:

```
--color-accent:     #E85D2F  (cam — CTA, highlight)
--color-bg-dark:    #0D1117  (section tối)
--color-bg-muted:   #F5F5F5  (section phân cách)
--color-text-muted: #6B7280
--color-border:     #E5E7EB
--nav-height:       80px
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

Thứ tự section: Navbar → Hero → Stats → Services → About → DarkFeature → Partners → Team → CTABanner → Footer

ToolReviews đã tách ra trang riêng `/reviews`, không còn trên Home.

## Trang Reviews (`/reviews`)

Thứ tự section:
1. **FeaturedTool** — tự động lấy tool rating cao nhất từ API
2. **SearchBar** — tìm kiếm realtime, truyền `searchQuery` prop xuống ToolReviews
3. **ToolReviews** — nhận prop `searchQuery`; khi có query thì filter toàn bộ danh mục, ẩn tabs; khi rỗng thì hiện tabs theo danh mục
4. **GuideSection** — 3 block tips tĩnh
5. **NewsletterSection** — form email (UI only)

CSS riêng: `mhc-app/src/pages/Reviews.css`

## Admin

Truy cập tại `localhost:3000/admin` — redirect về `/login` nếu chưa đăng nhập.

**Dashboard layout:**
- Stats row: 4 card có icon màu (Package/blue, FolderOpen/green, BarChart3/orange, Star/yellow)
- Mid row 2 cột: Quick Actions (trái, 320px) + Recent Products (phải, 5 tool mới nhất)
- Table bên dưới: liệt kê tool theo danh mục, lọc qua sidebar nav

**AdminToolForm** (`/admin/add`, `/admin/edit/:id`):
- Section **"Nhập nhanh bằng AI"** ở đầu cột trái — collapsible, màu cam
  - Copy prompt mẫu → paste vào ChatGPT/Claude → paste JSON trả về → Import tự điền toàn bộ form
- Logo: upload ảnh (< 5MB) hoặc dùng text logo — bắt buộc có một trong hai
- **Danh mục bắt buộc chọn** (không có default), có option placeholder "-- Chọn danh mục --"
- Load data bằng `Promise.all([fetchTools(), fetchToolDetail(id)])`, có loading state
- Mọi thao tác thành công dispatch `new Event('mhc_tools_updated')`

## Footer

Trên desktop: grid 4 cột. Trên mobile (≤480px): các nav col chuyển thành **accordion dropdown** — click heading để toggle, animation mượt dùng `max-height` + `opacity` transition.

## Ngôn ngữ nội dung

Tiếng Việt cho body copy, tiếng Anh cho heading/label. Công ty: **MHC Group**, tagline: *We Don't Just Drive Traffic — We Drive Profit*, màu nhấn cam `#E85D2F`.

## Quy tắc làm việc

- Hỏi user trước khi chỉnh sửa bất kỳ file code nào
- Không để import hoặc biến không dùng (ESLint của CRA sẽ báo lỗi)
- Ảnh/screenshot lưu vào `C:/Users/Admin/Desktop/MHC-web/image/`
- Thinking và trả lời luôn bằng tiếng Việt
