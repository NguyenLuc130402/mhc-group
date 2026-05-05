require('dotenv').config();
const dns      = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const multer   = require('multer');
const fs       = require('fs');
const path     = require('path');

const app = express();
app.use(cors());
app.use(express.json());

/* ── Static uploads ── */
const UPLOADS_DIR = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(UPLOADS_DIR));

/* ── Multer config ── */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename:    (req, file, cb) => {
    const ext  = path.extname(file.originalname).toLowerCase();
    const name = `logo_${Date.now()}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|svg/;
    if (allowed.test(path.extname(file.originalname).toLowerCase())) cb(null, true);
    else cb(new Error('Chỉ chấp nhận ảnh JPG, PNG, WebP, SVG'));
  },
});

/* ── Schemas ── */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email:    { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
}, { timestamps: true });

const toolSchema = new mongoose.Schema({
  id:         { type: String, required: true, unique: true },
  name:       String,
  category:   String,
  rating:     Number,
  reviews:    Number,
  logoUrl:    String,
  logoBg:     String,
  logoFill:   String,
  logoText:   String,
  logoShape:  String,
  logoBgFill: String,
});

const detailSchema = new mongoose.Schema({
  toolId:      { type: String, required: true, unique: true },
  tagline:     String,
  website:     String,
  pricing:     String,
  founded:     String,
  description: String,
  pros:        [String],
  cons:        [String],
  features:    [{ title: String, desc: String }],
  faqs:        [{ q: String, a: String }],
  userReviews: [{ name: String, role: String, rating: Number, comment: String, date: String }],
});

const User       = mongoose.model('User',       userSchema);
const Tool       = mongoose.model('Tool',       toolSchema);
const ToolDetail = mongoose.model('ToolDetail', detailSchema);

/* ── JWT Middleware ── */
function authenticateToken(req, res, next) {
  const auth  = req.headers['authorization'];
  const token = auth && auth.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Chưa đăng nhập' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: 'Token không hợp lệ hoặc đã hết hạn' });
  }
}

/* ── Auth Routes ── */
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
  if (password.length < 6)
    return res.status(400).json({ error: 'Mật khẩu phải có ít nhất 6 ký tự' });

  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists) return res.status(409).json({ error: 'Username hoặc email đã tồn tại' });

  const hashed = await bcrypt.hash(password, 10);
  const user   = await User.create({ username, email, password: hashed });
  const token  = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ token, username: user.username });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Vui lòng nhập email và mật khẩu' });

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Email hoặc mật khẩu không đúng' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Email hoặc mật khẩu không đúng' });

  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, username: user.username });
});

/* ── Upload ── */
app.post('/api/upload', authenticateToken, upload.single('logo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Không có file được upload' });
  const url = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;
  res.json({ url });
});

app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ error: 'File vượt quá 5MB' });
  if (err.message) return res.status(400).json({ error: err.message });
  next(err);
});

/* ── Seed data lần đầu ── */
async function seedIfEmpty() {
  const count = await Tool.countDocuments();
  if (count > 0) return;
  const toolsFile  = path.join(__dirname, 'data', 'tools.json');
  const detailFile = path.join(__dirname, 'data', 'toolsDetail.json');
  const tools  = JSON.parse(fs.readFileSync(toolsFile,  'utf8'));
  const detail = JSON.parse(fs.readFileSync(detailFile, 'utf8'));
  await Tool.insertMany(tools);
  const detailDocs = Object.entries(detail).map(([toolId, data]) => ({ toolId, ...data }));
  if (detailDocs.length) await ToolDetail.insertMany(detailDocs);
  console.log(`Seeded ${tools.length} tools vào MongoDB`);
}

/* ── Generate detail mặc định ── */
function generateDetail(tool) {
  const categoryMap = {
    'AI Tool':        { pricingHint: 'Freemium / Có gói trả phí', foundedHint: '2020–2023' },
    'CRM Tool':       { pricingHint: 'Từ $15–$150/user/tháng',    foundedHint: '2000–2015' },
    'SaaS Platforms': { pricingHint: 'Freemium / Từ $8/tháng',    foundedHint: '2010–2020' },
    'Marketing Tool': { pricingHint: 'Freemium / Từ $10/tháng',   foundedHint: '2005–2018' },
    'SEO Tool':       { pricingHint: 'Từ $99–$499/tháng',         foundedHint: '2008–2015' },
  };
  const info = categoryMap[tool.category] || {};
  return {
    tagline: `Giải pháp ${tool.category} hàng đầu được hàng triệu người tin dùng`,
    website: '#',
    pricing: info.pricingHint || 'Liên hệ để biết giá',
    founded: info.foundedHint || 'N/A',
    description: `${tool.name} là một trong những công cụ ${tool.category} được đánh giá cao nhất hiện nay.`,
    pros: ['Giao diện trực quan, dễ sử dụng', 'Tích hợp tốt với các nền tảng phổ biến', 'Hỗ trợ khách hàng nhanh chóng', 'Cập nhật tính năng thường xuyên'],
    cons: ['Chi phí có thể cao với doanh nghiệp nhỏ', 'Một số tính năng nâng cao yêu cầu gói trả phí'],
    features: [
      { title: 'Tính năng cốt lõi',         desc: `Bộ công cụ ${tool.category} đầy đủ giúp bạn tối ưu công việc.` },
      { title: 'Tích hợp & API',             desc: 'Kết nối liền mạch với hàng trăm ứng dụng phổ biến.' },
      { title: 'Báo cáo & Analytics',        desc: 'Dashboard trực quan với số liệu thời gian thực.' },
      { title: 'Bảo mật & Quyền riêng tư',  desc: 'Mã hóa dữ liệu cấp doanh nghiệp, tuân thủ GDPR.' },
    ],
    faqs: [
      { q: `${tool.name} có phù hợp với doanh nghiệp nhỏ không?`, a: `Có, ${tool.name} cung cấp các gói linh hoạt phù hợp với mọi quy mô.` },
      { q: `${tool.name} có hỗ trợ tiếng Việt không?`,            a: 'Hỗ trợ nội dung và dữ liệu tiếng Việt đầy đủ.' },
      { q: `Tôi có thể dùng thử ${tool.name} miễn phí không?`,    a: `${tool.name} thường cung cấp bản dùng thử miễn phí 14–30 ngày.` },
    ],
    userReviews: [
      { name: 'Phạm Thành Đạt',    role: 'Marketing Manager',       rating: 5, comment: `${tool.name} thực sự ấn tượng, rất recommend!`,              date: 'Tháng 4, 2025' },
      { name: 'Nguyễn Hồng Nhung', role: 'Business Owner, Đà Nẵng', rating: 4, comment: 'Sử dụng 6 tháng, hài lòng với tốc độ và độ ổn định.',       date: 'Tháng 3, 2025' },
      { name: 'Trần Minh Khoa',    role: 'Team Lead, Startup',       rating: 5, comment: 'ROI rõ ràng, team tiết kiệm khoảng 10 giờ/tuần.',           date: 'Tháng 2, 2025' },
    ],
  };
}

function toPlain(doc) {
  const obj = doc.toObject();
  delete obj._id; delete obj.__v;
  return obj;
}

/* ── Tools (GET công khai, POST/PUT/DELETE cần auth) ── */
app.get('/api/tools', async (req, res) => {
  const tools = await Tool.find({}, { _id: 0, __v: 0 });
  res.json(tools);
});

app.post('/api/tools', authenticateToken, async (req, res) => {
  const tool = new Tool(req.body);
  await tool.save();
  res.status(201).json(toPlain(tool));
});

app.put('/api/tools/:id', authenticateToken, async (req, res) => {
  const tool = await Tool.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, { new: true });
  if (!tool) return res.status(404).json({ error: 'Not found' });
  res.json(toPlain(tool));
});

app.delete('/api/tools/:id', authenticateToken, async (req, res) => {
  const result = await Tool.deleteOne({ id: req.params.id });
  if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
  await ToolDetail.deleteOne({ toolId: req.params.id });
  res.json({ ok: true });
});

/* ── Tool Detail (GET công khai, PUT cần auth) ── */
app.get('/api/tools/:id/detail', async (req, res) => {
  const detail = await ToolDetail.findOne({ toolId: req.params.id }, { _id: 0, __v: 0, toolId: 0 });
  if (detail) return res.json(detail.toObject());
  const tool = await Tool.findOne({ id: req.params.id });
  if (!tool) return res.status(404).json({ error: 'Not found' });
  res.json(generateDetail(tool));
});

app.put('/api/tools/:id/detail', authenticateToken, async (req, res) => {
  const detail = await ToolDetail.findOneAndUpdate(
    { toolId: req.params.id },
    { $set: req.body },
    { new: true, upsert: true }
  );
  res.json(detail.toObject());
});

/* ── Start ── */
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI, { family: 4, serverSelectionTimeoutMS: 10000 })
  .then(async () => {
    console.log('Kết nối MongoDB Atlas thành công');
    await seedIfEmpty();
    app.listen(PORT, () => console.log(`MHC API running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Lỗi kết nối MongoDB:', err.message);
    process.exit(1);
  });
