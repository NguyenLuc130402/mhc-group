import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import './ToolReviews.css';

const categories = ['AI Tool', 'CRM Tool', 'SaaS Platforms', 'Marketing Tool', 'SEO Tool'];

const tools = {
  'AI Tool': [
    { name: 'ChatGPT', desc: 'Trợ lý AI mạnh mẽ cho viết lách, phân tích và tự động hóa công việc.', rating: 4.8, reviews: 12400 },
    { name: 'Midjourney', desc: 'Tạo hình ảnh sáng tạo từ văn bản với chất lượng nghệ thuật vượt trội.', rating: 4.7, reviews: 8900 },
    { name: 'Claude', desc: 'AI assistant an toàn, thông minh cho phân tích và xử lý văn bản chuyên sâu.', rating: 4.8, reviews: 6200 },
    { name: 'Gemini', desc: 'AI đa phương thức của Google, tích hợp sâu với hệ sinh thái Google Workspace.', rating: 4.5, reviews: 5100 },
    { name: 'Perplexity', desc: 'Công cụ tìm kiếm AI thế hệ mới với câu trả lời chính xác và nguồn trích dẫn rõ ràng.', rating: 4.6, reviews: 3800 },
    { name: 'Runway', desc: 'Nền tảng sáng tạo AI cho video, hình ảnh và nội dung đa phương tiện chuyên nghiệp.', rating: 4.4, reviews: 2900 },
  ],
  'CRM Tool': [
    { name: 'Salesforce', desc: 'Nền tảng CRM hàng đầu thế giới, toàn diện cho doanh nghiệp mọi quy mô.', rating: 4.6, reviews: 32000 },
    { name: 'HubSpot', desc: 'CRM miễn phí, dễ dùng với đầy đủ tính năng marketing, sales và service.', rating: 4.7, reviews: 28000 },
    { name: 'Zoho CRM', desc: 'Giải pháp CRM linh hoạt, giá cả phải chăng cho doanh nghiệp vừa và nhỏ.', rating: 4.3, reviews: 15000 },
    { name: 'Pipedrive', desc: 'CRM tập trung vào pipeline bán hàng, trực quan và dễ quản lý deal.', rating: 4.5, reviews: 9800 },
    { name: 'Monday CRM', desc: 'Quản lý quan hệ khách hàng linh hoạt trên nền tảng Work OS phổ biến.', rating: 4.4, reviews: 7200 },
    { name: 'Freshsales', desc: 'CRM thông minh với AI tích hợp, phù hợp cho đội sales năng động.', rating: 4.3, reviews: 5600 },
  ],
  'SaaS Platforms': [
    { name: 'Notion', desc: 'All-in-one workspace cho ghi chú, quản lý dự án và cơ sở dữ liệu nhóm.', rating: 4.7, reviews: 41000 },
    { name: 'Slack', desc: 'Nền tảng giao tiếp nhóm hàng đầu, tích hợp hàng nghìn ứng dụng.', rating: 4.6, reviews: 38000 },
    { name: 'Figma', desc: 'Công cụ thiết kế UI/UX cộng tác thời gian thực, tiêu chuẩn ngành.', rating: 4.8, reviews: 29000 },
    { name: 'Jira', desc: 'Quản lý dự án Agile chuyên nghiệp cho đội kỹ thuật và phát triển phần mềm.', rating: 4.3, reviews: 24000 },
    { name: 'Airtable', desc: 'Cơ sở dữ liệu trực quan kết hợp spreadsheet, linh hoạt cho mọi workflow.', rating: 4.5, reviews: 16000 },
    { name: 'Linear', desc: 'Quản lý issue và dự án cực nhanh, được thiết kế cho đội engineering hiện đại.', rating: 4.7, reviews: 8400 },
  ],
  'Marketing Tool': [
    { name: 'Mailchimp', desc: 'Nền tảng email marketing phổ biến nhất, dễ dùng với automation mạnh mẽ.', rating: 4.5, reviews: 44000 },
    { name: 'Canva', desc: 'Thiết kế đồ họa trực tuyến cho mọi người, từ social media đến presentation.', rating: 4.8, reviews: 52000 },
    { name: 'Buffer', desc: 'Lên lịch và phân tích mạng xã hội đơn giản, hiệu quả cho cá nhân và doanh nghiệp.', rating: 4.4, reviews: 18000 },
    { name: 'Hootsuite', desc: 'Quản lý toàn bộ mạng xã hội tập trung với analytics và lên lịch chuyên sâu.', rating: 4.3, reviews: 22000 },
    { name: 'ActiveCampaign', desc: 'Email marketing + CRM + automation đỉnh cao cho doanh nghiệp B2B và B2C.', rating: 4.6, reviews: 13000 },
    { name: 'Webflow', desc: 'Thiết kế và phát triển website chuyên nghiệp không cần code, mạnh mẽ và linh hoạt.', rating: 4.6, reviews: 11000 },
  ],
  'SEO Tool': [
    { name: 'Ahrefs', desc: 'Bộ công cụ SEO toàn diện nhất: backlink, keyword, audit và competitor research.', rating: 4.8, reviews: 19000 },
    { name: 'SEMrush', desc: 'Nền tảng marketing all-in-one với hơn 55 công cụ SEO, PPC và content.', rating: 4.7, reviews: 21000 },
    { name: 'Moz Pro', desc: 'SEO platform uy tín với Domain Authority metric và keyword tracking chính xác.', rating: 4.4, reviews: 12000 },
    { name: 'Screaming Frog', desc: 'Website crawler mạnh nhất để audit kỹ thuật SEO và tìm lỗi on-page.', rating: 4.6, reviews: 8700 },
    { name: 'Google Search Console', desc: 'Công cụ miễn phí của Google để theo dõi hiệu suất tìm kiếm và sức khỏe website.', rating: 4.7, reviews: 67000 },
    { name: 'Surfer SEO', desc: 'Tối ưu nội dung on-page dựa trên dữ liệu thực tế với AI content editor.', rating: 4.5, reviews: 6200 },
  ],
};

function StarRating({ rating }) {
  return (
    <div className="tool-card__stars">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={13} className={i <= Math.round(rating) ? 'star--filled' : 'star--empty'} />
      ))}
      <span className="tool-card__rating-num">{rating}</span>
    </div>
  );
}

function ToolCard({ name, desc, rating, reviews, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className="tool-card"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ translateY: -5 }}
    >
      <div className="tool-card__top">
        <div className="tool-card__avatar">{name.charAt(0)}</div>
        <a href="#top" className="tool-card__link">
          <ExternalLink size={14} />
        </a>
      </div>
      <h4 className="tool-card__name">{name}</h4>
      <p className="tool-card__desc">{desc}</p>
      <div className="tool-card__footer">
        <StarRating rating={rating} />
        <span className="tool-card__reviews">{reviews.toLocaleString()} đánh giá</span>
      </div>
    </motion.div>
  );
}

export default function ToolReviews() {
  const [active, setActive] = useState('AI Tool');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="tool-reviews">
      <div className="container">
        <motion.div
          ref={ref}
          className="tool-reviews__header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Đánh giá công cụ</span>
          <h2 className="tool-reviews__heading">
            Khám phá và so sánh<br />các công cụ hàng đầu
          </h2>
          <p className="tool-reviews__sub">
            Đánh giá khách quan từ cộng đồng người dùng thực tế — giúp bạn chọn đúng công cụ cho công việc.
          </p>
        </motion.div>

        <motion.div
          className="tool-reviews__tabs"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              className={`tool-reviews__tab${active === cat ? ' tool-reviews__tab--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="tool-reviews__grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {tools[active].map((tool, i) => (
              <ToolCard key={tool.name} {...tool} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
