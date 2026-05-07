import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
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

function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 70 }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      r:       Math.random() * 1.2 + 0.3,
      vx:      (Math.random() - 0.5) * 0.18,
      vy:      (Math.random() - 0.5) * 0.18,
      opacity: Math.random() * 0.18 + 0.04,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0)             p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0)             p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__particles" />;
}

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="hero" id="top">
      <Particles />
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />
      <div className="hero__dots" />

      <div className="container hero__inner">
        <motion.h1
          className="hero__name"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <motion.span
            className="hero__name--accent"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >MHC</motion.span>
          {' GROUP'}
          <span className="hero__cursor" />
        </motion.h1>

        <motion.div
          className="hero__tagline"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          We Don't Just Drive Traffic — We Drive Profit
        </motion.div>

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

      <div className="hero__wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,50 C320,10 1120,80 1440,30 L1440,80 L0,80 Z" fill="#fff" />
        </svg>
      </div>

      <motion.button
        className="hero__scroll-hint"
        onClick={() => { const el = document.getElementById('intro'); if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - 80); }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.4, duration: 0.5 }, y: { delay: 1.8, duration: 1.4, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <ChevronDown size={22} />
      </motion.button>
    </section>
  );
}
