import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useLang } from '../../contexts/LangContext';
import aboutImg from '../../assets/images/l_1657386633_45485539_img-bao-cao-minh-bach.png';
import './About.css';

export default function About() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const imgRef = useRef(null);
  const imgInView = useInView(imgRef, { once: true, margin: '-80px' });

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
          <img src={aboutImg} alt="Báo cáo minh bạch MHC" className="about__img" />
        </motion.div>
      </div>
    </section>
  );
}
