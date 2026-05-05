import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import './About.css';

const points = [
  'Chuyên gia Google Ads, Affiliate & Performance Marketing với hơn 10 năm kinh nghiệm',
  'Hệ thống tracking & báo cáo minh bạch theo thời gian thực',
  'Tư vấn chiến lược cá nhân hóa, tối ưu ngân sách tối đa ROI',
  'Cam kết KPI rõ ràng, đo lường hiệu quả bằng số liệu thực',
];

const chartData = [
  { h: 55, month: 'T1', leads: 320 },
  { h: 72, month: 'T2', leads: 415 },
  { h: 48, month: 'T3', leads: 280 },
  { h: 88, month: 'T4', leads: 510 },
  { h: 65, month: 'T5', leads: 378 },
  { h: 95, month: 'T6', leads: 551 },
  { h: 78, month: 'T7', leads: 452 },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const imgRef = useRef(null);
  const imgInView = useInView(imgRef, { once: true, margin: '-80px' });

  return (
    <section className="about" id="about">
      <div className="container about__inner">
        <motion.div
          ref={ref}
          className="about__content"
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">Về MHC Group</span>
          <h2 className="about__heading">
            Xây dựng trên nền tảng tin cậy và chuyên môn
          </h2>
          <p className="about__desc">
            MHC Group được thành lập với sứ mệnh mang lại các giải pháp Performance Marketing
            hiệu quả cho doanh nghiệp tại Nghệ An và cả nước. Chúng tôi tự hào là đối tác
            chiến lược giúp hàng nghìn khách hàng tăng trưởng doanh thu thực sự qua các
            chiến dịch Google Ads, Affiliate và Performance Marketing.
          </p>

          <ul className="about__points">
            {points.map((p, i) => (
              <motion.li
                key={i}
                className="about__point"
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              >
                <CheckCircle size={18} className="about__check" />
                <span>{p}</span>
              </motion.li>
            ))}
          </ul>

          <a href="#contact" className="btn-primary about__cta">
            Làm việc với chúng tôi <ArrowRight size={16} />
          </a>
        </motion.div>

        <motion.div
          ref={imgRef}
          className="about__visual"
          initial={{ opacity: 0, x: 32 }}
          animate={imgInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about__visual-card about__visual-card--main">
            <div className="about__visual-header">
              <span className="about__visual-dot about__visual-dot--green" />
              <span className="about__visual-title">Hiệu suất chiến dịch 2025</span>
              <span className="about__visual-badge">Leads / tháng</span>
            </div>

            <div className="about__chart-bars">
              {chartData.map((d, i) => (
                <div key={i} className="about__bar-wrap">
                  <motion.span
                    className="about__bar-value"
                    initial={{ opacity: 0 }}
                    animate={imgInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.06 }}
                  >
                    {d.leads}
                  </motion.span>
                  <motion.div
                    className="about__bar"
                    initial={{ scaleY: 0 }}
                    animate={imgInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
                    style={{ '--bar-h': `${d.h}%` }}
                  />
                  <span className="about__bar-month">{d.month}</span>
                </div>
              ))}
            </div>

            <div className="about__visual-stat">
              <span className="about__visual-stat-value">+72.2%</span>
              <span className="about__visual-stat-label">Tăng trưởng leads T1 → T6</span>
            </div>
          </div>

          <div className="about__visual-card about__visual-card--secondary">
            <span className="about__mini-label">ROAS trung bình</span>
            <span className="about__mini-value">4.2x</span>
            <span className="about__mini-sub">trên toàn bộ chiến dịch</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
