import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, DollarSign, ChevronDown, BarChart2, Target, Zap, Percent } from 'lucide-react';
import './Hero.css';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] },
  }),
};

const FLOATS = [
  { id: 1, icon: <TrendingUp size={15} />, label: 'ROI +240%', x: '7%',  y: '30%', color: '#4ade80', bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.2)',   delay: 0,   dur: 5,   dist: 18,  depth: 20 },
  { id: 2, icon: <DollarSign size={15} />, label: null,        x: '84%', y: '27%', color: '#E85D2F', bg: 'rgba(232,93,47,0.12)', border: 'rgba(232,93,47,0.25)',   delay: 1.2, dur: 4,   dist: -14, depth: 35 },
  { id: 3, icon: <BarChart2  size={15} />, label: 'Analytics', x: '5%',  y: '60%', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.22)',  delay: 0.6, dur: 6,   dist: 12,  depth: 25 },
  { id: 4, icon: <Target     size={15} />, label: null,        x: '87%', y: '57%', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)',border: 'rgba(167,139,250,0.22)', delay: 1.8, dur: 4.5, dist: -20, depth: 30 },
  { id: 5, icon: <Percent    size={13} />, label: 'CPC ↓32%',  x: '78%', y: '75%', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)',   delay: 0.3, dur: 5.5, dist: 16,  depth: 18 },
  { id: 6, icon: <Zap        size={14} />, label: null,        x: '12%', y: '76%', color: '#E85D2F', bg: 'rgba(232,93,47,0.1)',  border: 'rgba(232,93,47,0.22)',   delay: 2,   dur: 3.8, dist: -12, depth: 28 },
  { id: 7, icon: <BarChart2  size={13} />, label: 'Google Ads',x: '88%', y: '41%', color: '#60a5fa', bg: 'rgba(96,165,250,0.08)',border: 'rgba(96,165,250,0.18)',  delay: 0.9, dur: 5,   dist: 10,  depth: 22 },
];

const metrics = [
  { icon: DollarSign,  value: '500+ Tỷ', label: 'Doanh thu tạo ra',    trend: '+18%' },
  { icon: Users,       value: '1,200+',  label: 'Khách hàng tin tưởng', trend: '+24%' },
  { icon: TrendingUp,  value: '10+',     label: 'Năm kinh nghiệm',      trend: 'Since 2013' },
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* Orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />
      <div className="hero__dots" />

      {/* Floating elements */}
      {FLOATS.map(f => (
        <motion.div
          key={f.id}
          className="hero__float"
          style={{
            left: f.x,
            top: f.y,
            '--float-color': f.color,
            '--float-bg': f.bg,
            '--float-border': f.border,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            translateY: [0, f.dist, 0],
          }}
          transition={{
            opacity: { delay: f.delay + 0.8, duration: 0.5 },
            scale:   { delay: f.delay + 0.8, duration: 0.5, type: 'spring' },
            translateY: { delay: f.delay, duration: f.dur, repeat: Infinity, ease: 'easeInOut' },
          }}
          whileHover={{ scale: 1.12, zIndex: 10 }}
        >
          <span className="hero__float-icon">{f.icon}</span>
          {f.label && <span className="hero__float-label">{f.label}</span>}
        </motion.div>
      ))}

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
