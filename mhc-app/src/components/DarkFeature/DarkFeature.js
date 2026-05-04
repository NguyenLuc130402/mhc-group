import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Settings2, TrendingUp, BarChart2 } from 'lucide-react';
import './DarkFeature.css';

const features = [
  {
    icon: Search,
    title: 'Nghiên cứu & Targeting',
    desc: 'Phân tích chuyên sâu đối tượng mục tiêu, từ khóa tiềm năng và đối thủ cạnh tranh để tối ưu chi phí.',
    tag: 'Bước 01',
  },
  {
    icon: Settings2,
    title: 'Thiết lập Campaign',
    desc: 'Cấu hình Google Ads, hệ thống Affiliate và tracking chuyển đổi chuẩn xác từ ngày đầu tiên.',
    tag: 'Bước 02',
  },
  {
    icon: TrendingUp,
    title: 'Tối ưu liên tục',
    desc: 'A/B test nội dung quảng cáo, điều chỉnh bid strategy và tối ưu funnel để tăng conversion rate.',
    tag: 'Bước 03',
  },
  {
    icon: BarChart2,
    title: 'Báo cáo & Scale',
    desc: 'Dashboard real-time theo dõi ROI, chi phí và doanh thu — nhân rộng những gì hoạt động tốt nhất.',
    tag: 'Bước 04',
  },
];

function FeatureItem({ icon: Icon, title, desc, tag, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="dark-feature__item"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ translateY: -5 }}
    >
      <div className="dark-feature__item-top">
        <div className="dark-feature__item-icon">
          <Icon size={20} strokeWidth={1.5} />
        </div>
        <span className="dark-feature__tag">{tag}</span>
      </div>
      <h3 className="dark-feature__item-title">{title}</h3>
      <p className="dark-feature__item-desc">{desc}</p>
    </motion.div>
  );
}

export default function DarkFeature() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="dark-feature">
      <div className="container">
        <motion.div
          ref={ref}
          className="dark-feature__header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span className="section-label dark-feature__section-label">Quy trình làm việc</span>
          <h2 className="dark-feature__heading">
            Hệ thống triển khai<br />được tối ưu cho kết quả
          </h2>
          <p className="dark-feature__sub">
            Từ nghiên cứu đến scale — mọi bước trong quy trình MHC đều được đo lường
            và tối ưu liên tục để tối đa hoá ROI cho khách hàng.
          </p>
        </motion.div>

        <div className="dark-feature__grid">
          {features.map((f, i) => <FeatureItem key={f.title} {...f} index={i} />)}
        </div>

        <motion.div
          className="dark-feature__mockup"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="dark-feature__mockup-bar">
            <span className="dark-feature__mockup-dot" />
            <span className="dark-feature__mockup-dot" />
            <span className="dark-feature__mockup-dot" />
          </div>
          <div className="dark-feature__mockup-body">
            <div className="dark-feature__mockup-row">
              <div className="dark-feature__mockup-block dark-feature__mockup-block--wide" />
              <div className="dark-feature__mockup-block" />
              <div className="dark-feature__mockup-block" />
            </div>
            <div className="dark-feature__mockup-chart">
              {[30, 50, 45, 65, 55, 78, 68, 85, 80, 95].map((h, i) => (
                <div key={i} className="dark-feature__mockup-bar-item" style={{ '--h': `${h}%` }} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
