import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import './About.css';

const points = [
  'Đội ngũ chuyên gia với hơn 15 năm kinh nghiệm trong lĩnh vực tài chính và đầu tư',
  'Mạng lưới đối tác ngân hàng và tổ chức tài chính rộng khắp cả nước',
  'Phương pháp tư vấn cá nhân hóa, lấy lợi ích khách hàng làm trọng tâm',
  'Cam kết minh bạch, trung thực trong từng tư vấn và giao dịch',
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
            MHC Group được thành lập với sứ mệnh mang lại các giải pháp tài chính chất lượng
            cao đến cộng đồng doanh nghiệp và cá nhân tại Nghệ An và khu vực Bắc Trung Bộ.
            Chúng tôi tự hào là đối tác chiến lược của hàng nghìn khách hàng trên hành trình
            phát triển tài chính bền vững.
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
              <span className="about__visual-title">Báo cáo danh mục Q1 2026</span>
            </div>
            <div className="about__chart-bars">
              {[60, 80, 50, 90, 70, 95, 75].map((h, i) => (
                <div key={i} className="about__bar-wrap">
                  <motion.div
                    className="about__bar"
                    initial={{ scaleY: 0 }}
                    animate={imgInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
                    style={{ '--bar-h': `${h}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="about__visual-stat">
              <span className="about__visual-stat-value">+24.6%</span>
              <span className="about__visual-stat-label">Tăng trưởng danh mục</span>
            </div>
          </div>

          <div className="about__visual-card about__visual-card--secondary">
            <span className="about__mini-label">Khách hàng mới</span>
            <span className="about__mini-value">+127</span>
            <span className="about__mini-sub">trong 30 ngày qua</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
