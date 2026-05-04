import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import './Stats.css';

const stats = [
  { to: 98, suffix: '%', label: 'Khách hàng tin tưởng' },
  { to: 1200, suffix: '+', label: 'Khách hàng tin tưởng', format: true },
  { to: 500, suffix: '+', label: 'Tỷ đồng doanh thu' },
  { to: 200, suffix: '+', label: 'Dự án thành công' },
];

const partners = ['Google', 'Meta', 'TikTok', 'Shopee', 'Lazada', 'Zalo'];

function formatNum(n, format) {
  if (!format) return Math.round(n).toString();
  return Math.round(n).toLocaleString('en-US');
}

function useCountUp(to, inView, duration = 1800, format = false) {
  const [display, setDisplay] = useState('0');
  const rafRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(formatNum(eased * to, format));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, to, duration, format]);

  return display;
}

function StatItem({ to, suffix, label, format, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const display = useCountUp(to, inView, 1800, format);

  return (
    <motion.div
      ref={ref}
      className="stats__item"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="stats__value">
        {display}
        <span className="stats__suffix">{suffix}</span>
      </span>
      <span className="stats__label">{label}</span>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="stats" id="stats">
      <div className="container">
        <div className="stats__grid">
          {stats.map((s, i) => <StatItem key={s.label} {...s} index={i} />)}
        </div>

        <motion.div
          ref={ref}
          className="stats__partners"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="stats__partners-label">Nền tảng đã triển khai</span>
          <div className="stats__partners-logos">
            {partners.map(p => (
              <span key={p} className="stats__partner-name">{p}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
