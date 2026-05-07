import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import teamImg from '../../assets/team-image/z7792391558541_fa3f6d477bf041a87bb0e7b2825bb367.jpg';
import { useLang } from '../../contexts/LangContext';
import './Intro.css';

export default function Intro() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="intro" id="intro" ref={ref}>
      <div className="container intro__inner">
        <motion.div
          className="intro__text"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="intro__heading">
            {t('intro.heading1')}
            <br />
            <span className="intro__heading--accent">{t('intro.heading2')}</span>
          </h2>

          <p className="intro__desc">{t('intro.desc')}</p>

          <div className="intro__address">
            <MapPin size={16} className="intro__address-icon" />
            <span>{t('intro.address')}</span>
          </div>

          <a href="#contact" className="btn-primary intro__cta">
            {t('intro.cta')} <ArrowRight size={15} />
          </a>
        </motion.div>

        <motion.div
          className="intro__image-wrap"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={teamImg} alt="MHC Group team" className="intro__image" />
        </motion.div>
      </div>
    </section>
  );
}
