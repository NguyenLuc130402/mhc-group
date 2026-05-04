import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, DollarSign, ChevronDown } from 'lucide-react';
import './Hero.css';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] },
  }),
};

const metrics = [
  { icon: DollarSign, value: '500+ Tỷ', label: 'Doanh thu tạo ra', trend: '+18%' },
  { icon: Users, value: '1,200+', label: 'Khách hàng tin tưởng', trend: '+24%' },
  { icon: TrendingUp, value: '15+', label: 'Năm kinh nghiệm', trend: 'Since 2009' },
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* Orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />
      <div className="hero__dots" />

      <div className="container hero__inner">
        <motion.span
          className="hero__badge"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <span className="hero__badge-dot" />
          Performance Marketing Agency
        </motion.span>

        <motion.h1
          className="hero__headline"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          We Don't Just Drive Traffic
          <br />
          <span className="hero__headline--accent">We Drive Profit</span>
        </motion.h1>

        <motion.p
          className="hero__sub"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          MHC Group triển khai Google Ads, Affiliate Marketing và Performance Marketing
          — tăng doanh thu thực sự cho doanh nghiệp của bạn.
        </motion.p>

        <motion.div
          className="hero__actions"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <a href="#services" className="btn-primary hero__btn-primary">
            Khám phá dịch vụ <ArrowRight size={16} />
          </a>
          <a href="#about" className="hero__btn-ghost">
            Về chúng tôi
          </a>
        </motion.div>

        <motion.div
          className="hero__metrics"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {metrics.map((m) => (
            <div key={m.label} className="hero__metric-card">
              <div className="hero__metric-icon">
                <m.icon size={18} />
              </div>
              <div className="hero__metric-body">
                <span className="hero__metric-value">{m.value}</span>
                <span className="hero__metric-label">{m.label}</span>
              </div>
              <span className="hero__metric-trend">{m.trend}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#stats"
        className="hero__scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        <ChevronDown size={22} />
      </motion.a>
    </section>
  );
}
