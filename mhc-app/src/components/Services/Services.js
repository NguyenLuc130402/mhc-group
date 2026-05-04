import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Link2, Rocket, Target, MousePointerClick, BarChart3 } from 'lucide-react';
import './Services.css';

const services = [
  {
    icon: Search,
    tag: 'Google Ads',
    title: 'Search Ads',
    desc: 'Tiếp cận đúng khách hàng tại thời điểm họ tìm kiếm. Tối ưu từ khóa theo đúng thế mạnh của bạn để tăng chuyển đổi và giảm chi phí mỗi click.',
    points: ['Demand keywords', 'Lead generation', 'Tối ưu CPC & ROAS'],
  },
  {
    icon: Link2,
    tag: 'Google Ads',
    title: 'Demand Gen & Display',
    desc: 'Mở rộng tệp khách hàng tiềm năng với chiến dịch hiển thị thông minh, tiếp cận đúng đối tượng theo hành vi và sở thích.',
    points: ['Remarketing', 'Lookalike audience', 'Brand awareness'],
  },
  {
    icon: Target,
    tag: 'Affiliate Marketing',
    title: 'Setup hệ thống Affiliate',
    desc: 'Xây dựng mạng lưới đối tác tiếp thị liên kết chuyên nghiệp — từ cấu hình hệ thống tracking đến tuyển dụng và quản lý publisher.',
    points: ['Hệ thống tracking', 'Quản lý publisher', 'Tối ưu hoa hồng'],
  },
  {
    icon: BarChart3,
    tag: 'Affiliate Marketing',
    title: 'Scale traffic & Conversion',
    desc: 'Tăng trưởng lưu lượng truy cập chất lượng cao thông qua mạng affiliate và tối ưu tỷ lệ chuyển đổi ở từng bước phễu.',
    points: ['Scale traffic', 'A/B testing', 'Tối ưu conversion'],
  },
  {
    icon: Rocket,
    tag: 'Performance Marketing',
    title: 'Funnel & Landing Page',
    desc: 'Thiết kế phễu marketing hiệu quả từ nhận thức đến hành động — kết hợp landing page chuyển đổi cao và luồng tự động hóa thông minh.',
    points: ['Funnel strategy', 'Landing page CRO', 'Email automation'],
  },
  {
    icon: MousePointerClick,
    tag: 'Performance Marketing',
    title: 'Conversion Tracking',
    desc: 'Theo dõi và đo lường chính xác mọi điểm chuyển đổi — từ click đến đơn hàng, giúp tối ưu ngân sách và ra quyết định dựa trên dữ liệu thực.',
    points: ['GA4 & GTM setup', 'Attribution model', 'Dashboard báo cáo'],
  },
];

const tagColors = {
  'Google Ads': { bg: '#e8f0fe', text: '#1a73e8' },
  'Affiliate Marketing': { bg: '#fce8e6', text: '#e53935' },
  'Performance Marketing': { bg: '#fff3e0', text: '#e85d2f' },
};

function ServiceCard({ icon: Icon, tag, title, desc, points, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const color = tagColors[tag];

  return (
    <motion.div
      ref={ref}
      className="service-card"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ translateY: -5 }}
    >
      <div className="service-card__top">
        <div className="service-card__icon">
          <Icon size={20} strokeWidth={1.5} />
        </div>
        <span className="service-card__tag" style={{ background: color.bg, color: color.text }}>
          {tag}
        </span>
      </div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__desc">{desc}</p>
      <ul className="service-card__points">
        {points.map(p => (
          <li key={p} className="service-card__point">
            <span className="service-card__dot" />
            {p}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="services" id="services">
      <div className="container">
        <motion.div
          ref={ref}
          className="services__header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Dịch vụ Chuyên nghiệp</span>
          <h2 className="services__heading">
            Tăng trưởng doanh thu<br />với Performance Marketing
          </h2>
          <p className="services__sub">
            MHC Group chuyên triển khai các giải pháp quảng cáo hiệu suất cao — từ Google Ads,
            Affiliate Marketing đến Performance Marketing toàn diện.
          </p>
        </motion.div>

        <div className="services__grid">
          {services.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
