import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Partners.css';

const testimonials = [
  {
    quote: 'MHC Group đã giúp chúng tôi cơ cấu lại toàn bộ chiến lược marketing và tăng doanh thu 28% chỉ trong một năm. Đội ngũ rất chuyên nghiệp và tận tâm.',
    name: 'Nguyễn Văn Thành',
    role: 'Giám đốc điều hành, Công ty CP Xây dựng Nghệ An',
  },
  {
    quote: 'Tư vấn minh bạch, rõ ràng và luôn đặt lợi ích của khách hàng lên hàng đầu. Tôi đã tin tưởng MHC trong 5 năm qua.',
    name: 'Trần Thị Hương',
    role: 'Doanh nhân cá nhân, Vinh City',
  },
  {
    quote: 'Dịch vụ Performance Marketing của MHC giúp chúng tôi đạt ROI vượt kỳ vọng. Campaign Google Ads tối ưu rất hiệu quả!',
    name: 'Lê Minh Quân',
    role: 'CEO, Tập đoàn Minh Phát',
  },
];

const logos = [
  { name: 'Google',   color: '#4285F4' },
  { name: 'Meta',     color: '#1877F2' },
  { name: 'TikTok',   color: '#010101' },
  { name: 'Shopee',   color: '#EE4D2D' },
  { name: 'Lazada',   color: '#F57224' },
  { name: 'Tiki',     color: '#1BA0E2' },
  { name: 'Zalo',     color: '#0068FF' },
  { name: 'YouTube',  color: '#FF0000' },
  { name: 'Cốc Cốc', color: '#29e351' },
  { name: 'Sendo',    color: '#C02127' },
];

function BrandIcon({ name }) {
  const size = 20;
  switch (name) {
    case 'Google':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      );
    case 'Meta':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    case 'TikTok':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#010101">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
        </svg>
      );
    case 'YouTube':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF0000">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case 'Shopee':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#EE4D2D">
          <path d="M12 2C9.243 2 7 4.243 7 7H4.5A1.5 1.5 0 003 8.5v11A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0019.5 7H17c0-2.757-2.243-5-5-5zm0 2a3 3 0 013 3H9a3 3 0 013-3zm0 7a3 3 0 110 6 3 3 0 010-6z"/>
        </svg>
      );
    case 'Lazada':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#F57224"/>
          <text x="6" y="17" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="white">L</text>
        </svg>
      );
    case 'Tiki':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#1BA0E2"/>
          <text x="5.5" y="17" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="white">Ti</text>
        </svg>
      );
    case 'Zalo':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#0068FF"/>
          <text x="3" y="17" fontFamily="Arial" fontWeight="bold" fontSize="13" fill="white">Za</text>
        </svg>
      );
    case 'Cốc Cốc':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#29e351"/>
          <text x="3" y="17" fontFamily="Arial" fontWeight="bold" fontSize="12" fill="white">CC</text>
        </svg>
      );
    case 'Sendo':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#C02127"/>
          <text x="4" y="17" fontFamily="Arial" fontWeight="bold" fontSize="13" fill="white">Se</text>
        </svg>
      );
    default:
      return null;
  }
}

function TestimonialCard({ quote, name, role, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="testimonial-card"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ translateY: -5 }}
    >
      <p className="testimonial-card__quote">"{quote}"</p>
      <div className="testimonial-card__author">
        <div className="testimonial-card__avatar">{name.charAt(0)}</div>
        <div>
          <span className="testimonial-card__name">{name}</span>
          <span className="testimonial-card__role">{role}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Partners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section className="partners" id="partners">
      <div className="container">
        <motion.div
          ref={ref}
          className="partners__header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Đối tác & Khách hàng</span>
          <h2 className="partners__heading">
            Được tin tưởng bởi hàng nghìn<br />khách hàng trên cả nước
          </h2>
        </motion.div>

        <motion.div
          className="partners__marquee"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="partners__marquee-track">
            {[...logos, ...logos].map((item, i) => (
              <span key={i} className="partners__logo-name">
                <BrandIcon name={item.name} />
                <span style={{ color: item.color }}>{item.name}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="container">
        <div className="partners__testimonials">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} {...t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
  