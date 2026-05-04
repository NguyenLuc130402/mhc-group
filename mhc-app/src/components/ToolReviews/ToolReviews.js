import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, Cpu, Users, Grid, Megaphone, Search } from 'lucide-react';
import { CATEGORIES, getTools, initTools } from '../../data/toolsData';
import './ToolReviews.css';

const categoryIcons = {
  'AI Tool':         <Cpu size={15} />,
  'CRM Tool':        <Users size={15} />,
  'SaaS Platforms':  <Grid size={15} />,
  'Marketing Tool':  <Megaphone size={15} />,
  'SEO Tool':        <Search size={15} />,
};

export function ToolLogo({ tool, size = 80 }) {
  const { logoBg, logoFill, logoText, logoShape, logoBgFill } = tool;
  const radius = logoShape === 'circle' ? '50%' : '14px';
  const inner = logoBgFill
    ? { background: logoBgFill, borderRadius: radius, width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }
    : { background: logoBg, borderRadius: radius, width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' };
  return (
    <div style={inner}>
      <span style={{ color: logoBgFill ? '#fff' : logoFill, fontWeight: 800, fontSize: Math.round(size * 0.22), letterSpacing: '-0.5px' }}>
        {logoText}
      </span>
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="tool-card__stars">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={13} className={i <= Math.round(rating) ? 'star--filled' : 'star--empty'} />
      ))}
    </div>
  );
}

function ToolCard({ tool, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      className="tool-card"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ translateY: -5 }}
    >
      <div className="tool-card__logo-wrap">
        <ToolLogo tool={tool} size={80} />
      </div>
      <h4 className="tool-card__name">{tool.name}</h4>
      <StarRating rating={tool.rating} />
      <span className="tool-card__reviews">{(tool.reviews / 1000).toFixed(0)}k đánh giá</span>
    </motion.div>
  );
}

export default function ToolReviews() {
  const [active, setActive] = useState(CATEGORIES[0]);
  const [allTools, setAllTools] = useState([]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    initTools();
    setAllTools(getTools());
    const onStorage = () => setAllTools(getTools());
    window.addEventListener('mhc_tools_updated', onStorage);
    return () => window.removeEventListener('mhc_tools_updated', onStorage);
  }, []);

  const filtered = allTools.filter(t => t.category === active);

  return (
    <section className="tool-reviews">
      <div className="container">
        <motion.div
          ref={ref}
          className="tool-reviews__header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Đánh giá công cụ</span>
          <h2 className="tool-reviews__heading">
            Khám phá và so sánh<br />các công cụ hàng đầu
          </h2>
          <p className="tool-reviews__sub">
            Đánh giá khách quan từ cộng đồng người dùng thực tế — giúp bạn chọn đúng công cụ cho công việc.
          </p>
        </motion.div>

        <motion.div
          className="tool-reviews__tabs"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`tool-reviews__tab${active === cat ? ' tool-reviews__tab--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {categoryIcons[cat]}
              {cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="tool-reviews__grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {filtered.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
