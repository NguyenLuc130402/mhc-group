import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLang } from '../../contexts/LangContext';
import './Hero.css';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] },
  }),
};

function smoothScrollTo(targetY, duration = 900) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let start = null;
  const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    window.scrollTo(0, startY + diff * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="hero" id="top">
      {/* Orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />
      <div className="hero__dots" />

      <div className="container hero__inner">
        <motion.h1
          className="hero__headline"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
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
          {t('hero.sub')}
        </motion.p>

        <motion.div
          className="hero__actions"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <a href="#services" className="btn-primary hero__btn-primary">
            {t('hero.cta1')} <ArrowRight size={16} />
          </a>
          <a href="#about" className="hero__btn-ghost">
            {t('hero.cta2')}
          </a>
        </motion.div>
      </div>

      <motion.button
        className="hero__scroll-hint"
        onClick={() => { const el = document.getElementById('stats'); if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - 80); }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.4, duration: 0.5 }, y: { delay: 1.8, duration: 1.4, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <ChevronDown size={22} />
      </motion.button>
    </section>
  );
}
