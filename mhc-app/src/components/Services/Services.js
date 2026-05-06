import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Link2, Rocket, Target, MousePointerClick, BarChart3 } from 'lucide-react';
import { useLang } from '../../contexts/LangContext';
import './Services.css';

const SERVICE_ICONS = [Search, Link2, Target, BarChart3, Rocket, MousePointerClick];
const SERVICE_TAGS = [
  'Google Ads', 'Google Ads',
  'Affiliate Marketing', 'Affiliate Marketing',
  'Performance Marketing', 'Performance Marketing',
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
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const services = t('services.items').map((item, i) => ({
    ...item,
    icon: SERVICE_ICONS[i],
    tag: SERVICE_TAGS[i],
  }));

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
          <span className="section-label">{t('services.label')}</span>
          <h2 className="services__heading">
            {t('services.headingLine1')}<br />
            {t('services.headingLine2')}
          </h2>
          <p className="services__sub">{t('services.sub')}</p>
        </motion.div>

        <div className="services__grid">
          {services.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
