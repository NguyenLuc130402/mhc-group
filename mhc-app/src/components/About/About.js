import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useLang } from '../../contexts/LangContext';
import './About.css';

const CHART_NUMS = [
  { h: 55, leads: 320 },
  { h: 72, leads: 415 },
  { h: 48, leads: 280 },
  { h: 88, leads: 510 },
  { h: 65, leads: 378 },
  { h: 95, leads: 551 },
  { h: 78, leads: 452 },
];

export default function About() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const imgRef = useRef(null);
  const imgInView = useInView(imgRef, { once: true, margin: '-80px' });

  const months = t('about.months');
  const chartData = CHART_NUMS.map((d, i) => ({ ...d, month: months[i] }));
  const points = t('about.points');

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
          <span className="section-label">{t('about.label')}</span>
          <h2 className="about__heading">
            {t('about.headingL1')}<br />
            {t('about.headingL2')}<br />
            {t('about.headingL3')}
          </h2>
          <p className="about__desc">{t('about.desc')}</p>

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
            {t('about.cta')} <ArrowRight size={16} />
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
              <span className="about__visual-title">{t('about.chartTitle')}</span>
              <span className="about__visual-badge">{t('about.chartBadge')}</span>
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
              <span className="about__visual-stat-label">{t('about.growth')}</span>
            </div>
          </div>

          <div className="about__visual-card about__visual-card--secondary">
            <span className="about__mini-label">{t('about.roasLabel')}</span>
            <span className="about__mini-value">4.2x</span>
            <span className="about__mini-sub">{t('about.roasSub')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
