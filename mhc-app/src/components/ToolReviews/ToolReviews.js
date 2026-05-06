import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, Cpu, Users, Grid, Megaphone, Search } from 'lucide-react';
import { CATEGORIES } from '../../data/toolsData';
import { fetchTools } from '../../api/toolsApi';
import './ToolReviews.css';

const categoryIcons = {
  'AI Tool':         <Cpu size={15} />,
  'CRM Tool':        <Users size={15} />,
  'SaaS Platforms':  <Grid size={15} />,
  'Marketing Tool':  <Megaphone size={15} />,
  'SEO Tool':        <Search size={15} />,
};

export function ToolLogo({ tool, size = 80 }) {
  const { logoBg, logoFill, logoText, logoShape, logoBgFill, logoUrl } = tool;
  const radius = logoShape === 'circle' ? '50%' : '14px';
  const wrap = { borderRadius: radius, width: size, height: size, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 };

  if (logoUrl) {
    return (
      <div style={{ ...wrap, background: logoBg || '#f5f5f5' }}>
        <img src={logoUrl} alt={logoText} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  }

  const bg = logoBgFill || logoBg;
  return (
    <div style={{ ...wrap, background: bg }}>
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
  const navigate = useNavigate();
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
      onClick={() => navigate(`/tool/${tool.id}`)}
      style={{ cursor: 'pointer' }}
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

export default function ToolReviews({ searchQuery = '' }) {
  const [active, setActive] = useState(CATEGORIES[0]);
  const [allTools, setAllTools] = useState([]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    fetchTools().then(setAllTools).catch(console.error);
    const onUpdate = () => fetchTools().then(setAllTools).catch(console.error);
    window.addEventListener('mhc_tools_updated', onUpdate);
    return () => window.removeEventListener('mhc_tools_updated', onUpdate);
  }, []);

  const q = searchQuery.trim().toLowerCase();
  const filtered = q
    ? allTools.filter(t => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
    : allTools.filter(t => t.category === active);

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

        {!q && (
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
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={q || active}
            className="tool-reviews__grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {filtered.length > 0
              ? filtered.map((tool, i) => <ToolCard key={tool.id} tool={tool} index={i} />)
              : <p style={{ color: '#94a3b8', fontSize: 14, gridColumn: '1/-1' }}>Không tìm thấy công cụ nào.</p>
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
