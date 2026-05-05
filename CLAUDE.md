# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Lệnh thường dùng

Cần chạy **2 process song song**:

```bash
# Terminal 1 — Express API (port 5000)
cd mhc-api
node server.js

# Terminal 2 — React app (port 3000)
cd mhc-app
npm start

# Build production
cd mhc-app && npm run build
```

Không có test suite ngoài mặc định của CRA. ESLint tích hợp sẵn trong CRA.

## Kiến trúc tổng quan

### Routing

Dùng **React Router v6** (`react-router-dom`). Cấu hình trong `mhc-app/src/App.js`:

```
/               → Home (src/pages/Home.js)
/login          → Đăng nhập (src/pages/Login.js)
/register       → Đăng ký (src/pages/Register.js)
/tool/:id       → Chi tiết tool (src/pages/ToolDetail.js)
/admin          → Admin dashboard — ProtectedRoute
/admin/add      → Form thêm tool — ProtectedRoute
/admin/edit/:id → Form sửa tool — ProtectedRoute
```

`ProtectedRoute` trong `App.js` kiểm tra `isLoggedIn()` từ `src/utils/auth.js` — nếu chưa đăng nhập redirect về `/login`.

Điều hướng dùng hook `useNavigate()`, lấy params dùng `useParams()`.

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
```

**Frontend API layer** (`mhc-app/src/api/toolsApi.js`):
- Tất cả hàm async: `fetchTools`, `createTool`, `updateTool`, `deleteTool`, `fetchToolDetail`, `saveToolDetail`, `login`, `register`
- Các hàm ghi (POST/PUT/DELETE) tự động đính kèm `Authorization: Bearer <token>` qua `authHeader()` từ `src/utils/auth.js`

**Auth utilities** (`mhc-app/src/utils/auth.js`):
- `saveAuth(token, username)` — lưu vào localStorage
- `clearAuth()` — xóa khi logout
- `isLoggedIn()` — dùng trong `ProtectedRoute`
- `authHeader()` — trả `{ Authorization: 'Bearer ...' }` để đính vào fetch

`mhc-app/src/data/toolsData.js` chỉ còn export `CATEGORIES` và `generateId()`.
`mhc-app/src/data/toolsDetail.js` chỉ còn `getEmptyDetail()`.

Khi data tool thay đổi, dispatch `new Event('mhc_tools_updated')` trên `window` — `ToolReviews` và `Admin` lắng nghe để re-fetch.

### Component ToolLogo

Export từ `mhc-app/src/components/ToolReviews/ToolReviews.js` (không phải file riêng), dùng lại ở Admin, AdminToolForm, ToolDetail. Render ô màu với chữ — không upload ảnh.

Các trường cấu hình logo: `logoBg`, `logoFill`, `logoText`, `logoShape` (`'rounded'|'circle'`), tùy chọn `logoBgFill` (override nền bằng màu solid, chữ tự động trắng).

### Design system

CSS custom properties định nghĩa trong `mhc-app/src/styles/variables.css`:

```
--color-accent:     #E85D2F  (cam — CTA, highlight)
--color-bg-dark:    #0D1117  (section tối)
--color-bg-muted:   #F5F5F5  (section phân cách)
--color-text-muted: #6B7280
--color-border:     #E5E7EB
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

Thứ tự section: Navbar → Hero → Stats → Services → About → DarkFeature → Partners → ToolReviews → CTABanner → Footer

## Admin

Truy cập tại `localhost:3000/admin` — redirect về `/login` nếu chưa đăng nhập.

- Dashboard liệt kê tất cả tool trong bảng, lọc theo danh mục qua sidebar
- Sidebar hiển thị username đang đăng nhập + nút **Trang chủ** + nút **Đăng xuất** (xóa token, redirect `/login`)
- Thêm/Sửa chuyển sang trang form riêng (`/admin/add`, `/admin/edit/:id`)
- Form load data bằng `Promise.all([fetchTools(), fetchToolDetail(id)])`, có loading state
- Xóa dùng dialog xác nhận inline, gọi `deleteTool(id)` rồi re-fetch
- Mọi thao tác thành công đều dispatch `new Event('mhc_tools_updated')` để đồng bộ

## Ngôn ngữ nội dung

Tiếng Việt cho body copy, tiếng Anh cho heading/label. Công ty: **MHC Group**, tagline: *We Don't Just Drive Traffic — We Drive Profit*, màu nhấn cam `#E85D2F`.

## Quy tắc làm việc

- Hỏi user trước khi chỉnh sửa bất kỳ file code nào
- CSS mobile-first — style cơ bản cho mobile, `@media (min-width: 768px)` cho desktop
- Không để import hoặc biến không dùng (ESLint của CRA sẽ báo lỗi)
- Ảnh/screenshot lưu vào `C:/Users/Admin/Desktop/MHC-web/image/`
- Thinking và trả lời luôn bằng tiếng Việt
