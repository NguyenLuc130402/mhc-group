import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, Cpu, Users, Grid, Megaphone, Search } from 'lucide-react';
import './ToolReviews.css';

const categories = [
  { label: 'AI Tool',         icon: <Cpu size={15} /> },
  { label: 'CRM Tool',        icon: <Users size={15} /> },
  { label: 'SaaS Platforms',  icon: <Grid size={15} /> },
  { label: 'Marketing Tool',  icon: <Megaphone size={15} /> },
  { label: 'SEO Tool',        icon: <Search size={15} /> },
];

/* ── Logo components ─────────────────────────────── */
const L = ({ bg, radius = '14px', children }) => (
  <div className="tool-logo" style={{ background: bg, borderRadius: radius }}>{children}</div>
);
const Txt = ({ color, size = 13, children }) => (
  <text x="24" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize={size} fill={color}>{children}</text>
);
const Rect = ({ fill }) => <rect x="6" y="6" width="36" height="36" rx="8" fill={fill} />;

const ChatGPTLogo = () => (
  <L bg="#f0fdf4">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="18" fill="#10a37f" />
      <text x="24" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="13" fill="white">GPT</text>
    </svg>
  </L>
);
const MidjourneyLogo = () => (
  <L bg="#f5f5f5">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <rect x="6" y="6" width="36" height="36" rx="8" fill="#111" />
      <Txt color="white" size={12}>MJ</Txt>
    </svg>
  </L>
);
const ClaudeLogo = () => (
  <L bg="#fff8f5">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <rect x="6" y="6" width="36" height="36" rx="8" fill="#E8693B" />
      <Txt color="white" size={11}>ANT</Txt>
    </svg>
  </L>
);
const GeminiLogo = () => (
  <L bg="#f0f4ff">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <path d="M24 6 Q32 24 24 42 Q16 24 24 6z" fill="#4285F4" />
      <path d="M6 24 Q24 16 42 24 Q24 32 6 24z" fill="#34A853" opacity="0.85" />
    </svg>
  </L>
);
const PerplexityLogo = () => (
  <L bg="#f0f8ff">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <rect x="6" y="6" width="36" height="36" rx="8" fill="#20B2AA" />
      <Txt color="white" size={11}>PPX</Txt>
    </svg>
  </L>
);
const RunwayLogo = () => (
  <L bg="#f5f0ff">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <rect x="6" y="6" width="36" height="36" rx="8" fill="#6200EE" />
      <Txt color="white" size={10}>RUN</Txt>
    </svg>
  </L>
);

const SalesforceLogo = () => (
  <L bg="#f0f4ff">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <ellipse cx="24" cy="26" rx="16" ry="12" fill="#00A1E0" />
      <ellipse cx="16" cy="22" rx="8" ry="7" fill="#00A1E0" />
      <ellipse cx="32" cy="20" rx="10" ry="8" fill="#00A1E0" />
      <text x="24" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="9" fill="white">SF</text>
    </svg>
  </L>
);
const HubSpotLogo = () => (
  <L bg="#fff5f0">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <circle cx="30" cy="16" r="6" fill="#FF7A59" />
      <circle cx="17" cy="28" r="5" fill="#FF7A59" />
      <circle cx="33" cy="32" r="4" fill="#FF7A59" />
      <line x1="25" y1="18" x2="17" y2="28" stroke="#FF7A59" strokeWidth="2.5" />
      <line x1="25" y1="18" x2="33" y2="32" stroke="#FF7A59" strokeWidth="2.5" />
      <line x1="17" y1="28" x2="33" y2="32" stroke="#FF7A59" strokeWidth="2.5" />
    </svg>
  </L>
);
const ZohoLogo = () => (
  <L bg="#f0f4ff">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <Rect fill="#0A2463" />
      <Txt color="white" size={11}>ZOHO</Txt>
    </svg>
  </L>
);
const PipedriveLogo = () => (
  <L bg="#f0fff4">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <Rect fill="#17B897" />
      <Txt color="white" size={10}>PIPE</Txt>
    </svg>
  </L>
);
const MondayLogo = () => (
  <L bg="#fff0f5">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <Rect fill="#F62B54" />
      <Txt color="white" size={9}>MON</Txt>
    </svg>
  </L>
);
const FreshsalesLogo = () => (
  <L bg="#f0fff4">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <Rect fill="#2DA94F" />
      <Txt color="white" size={9}>FRSH</Txt>
    </svg>
  </L>
);

const NotionLogo = () => (
  <L bg="#f5f5f5">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <Rect fill="#191919" />
      <text x="24" y="31" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="900" fontSize="18" fill="white">N</text>
    </svg>
  </L>
);
const SlackLogo = () => (
  <L bg="#fafafa">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <rect x="6" y="18" width="8" height="20" rx="4" fill="#E01E5A" />
      <rect x="18" y="6" width="8" height="20" rx="4" fill="#36C5F0" transform="rotate(90 22 16)" />
      <rect x="20" y="20" width="8" height="20" rx="4" fill="#2EB67D" />
      <rect x="6" y="20" width="8" height="20" rx="4" fill="#ECB22E" transform="rotate(90 10 30)" />
    </svg>
  </L>
);
const FigmaLogo = () => (
  <L bg="#fdf5ff">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <rect x="14" y="6" width="10" height="12" rx="5" fill="#F24E1E" />
      <rect x="24" y="6" width="10" height="12" rx="5" fill="#FF7262" />
      <rect x="14" y="18" width="10" height="12" rx="5" fill="#A259FF" />
      <circle cx="29" cy="24" r="6" fill="#1ABCFE" />
      <rect x="14" y="30" width="10" height="12" rx="5" fill="#0ACF83" />
    </svg>
  </L>
);
const JiraLogo = () => (
  <L bg="#f0f4ff">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <path d="M24 8 L40 24 L24 40 L8 24 Z" fill="#0052CC" />
      <path d="M24 14 L34 24 L24 34 L14 24 Z" fill="#2684FF" />
      <circle cx="24" cy="24" r="6" fill="#4C9AFF" />
    </svg>
  </L>
);
const AirtableLogo = () => (
  <L bg="#fff8e1">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <Rect fill="#FFBF00" />
      <Txt color="white" size={9}>AIR</Txt>
    </svg>
  </L>
);
const LinearLogo = () => (
  <L bg="#f5f0ff">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <Rect fill="#5E6AD2" />
      <text x="24" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="14" fill="white">L</text>
    </svg>
  </L>
);

const MailchimpLogo = () => (
  <L bg="#fffde7">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <ellipse cx="24" cy="28" rx="13" ry="11" fill="#FFE01B" />
      <circle cx="19" cy="25" r="2.5" fill="#241C15" />
      <circle cx="29" cy="25" r="2.5" fill="#241C15" />
      <path d="M19 31 Q24 35 29 31" stroke="#241C15" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="24" cy="16" rx="6" ry="8" fill="#FFE01B" />
    </svg>
  </L>
);
const CanvaLogo = () => (
  <L bg="#f0f8ff">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="18" fill="#00C4CC" />
      <text x="24" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="16" fill="white">C</text>
    </svg>
  </L>
);
const BufferLogo = () => (
  <L bg="#f0f4ff">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <Rect fill="#168EEA" />
      <rect x="16" y="16" width="16" height="4" rx="2" fill="white" />
      <rect x="16" y="23" width="16" height="4" rx="2" fill="white" />
      <rect x="16" y="30" width="10" height="4" rx="2" fill="white" />
    </svg>
  </L>
);
const HootsuiteLogo = () => (
  <L bg="#f0fff4">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <Rect fill="#143059" />
      <Txt color="white" size={9}>HOOT</Txt>
    </svg>
  </L>
);
const ActiveCampaignLogo = () => (
  <L bg="#f0f4ff">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <Rect fill="#356AE6" />
      <Txt color="white" size={12}>AC</Txt>
    </svg>
  </L>
);
const WebflowLogo = () => (
  <L bg="#f0f4ff">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <Rect fill="#4353FF" />
      <text x="24" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="11" fill="white">WF</text>
    </svg>
  </L>
);

const AhrefsLogo = () => (
  <L bg="#fff8f0">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <Rect fill="#FF9501" />
      <Txt color="white" size={9}>AHR</Txt>
    </svg>
  </L>
);
const SemrushLogo = () => (
  <L bg="#fff5f0">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <Rect fill="#FF642D" />
      <Txt color="white" size={9}>SEM</Txt>
    </svg>
  </L>
);
const MozLogo = () => (
  <L bg="#f0f5ff">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <Rect fill="#1172CB" />
      <text x="24" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="14" fill="white">Moz</text>
    </svg>
  </L>
);
const ScreamingFrogLogo = () => (
  <L bg="#f0fff4">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <Rect fill="#6DBE45" />
      <Txt color="white" size={11}>SEF</Txt>
    </svg>
  </L>
);
const SearchConsoleLogo = () => (
  <L bg="#f0fff4">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <circle cx="22" cy="22" r="11" fill="none" stroke="#34A853" strokeWidth="4" />
      <line x1="30" y1="30" x2="42" y2="42" stroke="#34A853" strokeWidth="4" strokeLinecap="round" />
    </svg>
  </L>
);
const SurferSEOLogo = () => (
  <L bg="#f0f8ff">
    <svg width="44" height="44" viewBox="0 0 48 48">
      <Rect fill="#2563EB" />
      <Txt color="white" size={9}>SRF</Txt>
    </svg>
  </L>
);

/* ── Tool data ───────────────────────────────────── */
const tools = {
  'AI Tool': [
    { name: 'ChatGPT',    logo: <ChatGPTLogo />,    rating: 4.8, reviews: 12400 },
    { name: 'Midjourney', logo: <MidjourneyLogo />,  rating: 4.7, reviews: 8900 },
    { name: 'Claude',     logo: <ClaudeLogo />,      rating: 4.8, reviews: 6200 },
    { name: 'Gemini',     logo: <GeminiLogo />,      rating: 4.5, reviews: 5100 },
    { name: 'Perplexity', logo: <PerplexityLogo />,  rating: 4.6, reviews: 3800 },
    { name: 'Runway',     logo: <RunwayLogo />,      rating: 4.4, reviews: 2900 },
  ],
  'CRM Tool': [
    { name: 'Salesforce',   logo: <SalesforceLogo />,    rating: 4.6, reviews: 32000 },
    { name: 'HubSpot',      logo: <HubSpotLogo />,       rating: 4.7, reviews: 28000 },
    { name: 'Zoho CRM',     logo: <ZohoLogo />,          rating: 4.3, reviews: 15000 },
    { name: 'Pipedrive',    logo: <PipedriveLogo />,     rating: 4.5, reviews: 9800  },
    { name: 'Monday CRM',   logo: <MondayLogo />,        rating: 4.4, reviews: 7200  },
    { name: 'Freshsales',   logo: <FreshsalesLogo />,    rating: 4.3, reviews: 5600  },
  ],
  'SaaS Platforms': [
    { name: 'Notion',    logo: <NotionLogo />,    rating: 4.7, reviews: 41000 },
    { name: 'Slack',     logo: <SlackLogo />,     rating: 4.6, reviews: 38000 },
    { name: 'Figma',     logo: <FigmaLogo />,     rating: 4.8, reviews: 29000 },
    { name: 'Jira',      logo: <JiraLogo />,      rating: 4.3, reviews: 24000 },
    { name: 'Airtable',  logo: <AirtableLogo />,  rating: 4.5, reviews: 16000 },
    { name: 'Linear',    logo: <LinearLogo />,    rating: 4.7, reviews: 8400  },
  ],
  'Marketing Tool': [
    { name: 'Mailchimp',       logo: <MailchimpLogo />,       rating: 4.5, reviews: 44000 },
    { name: 'Canva',           logo: <CanvaLogo />,           rating: 4.8, reviews: 52000 },
    { name: 'Buffer',          logo: <BufferLogo />,          rating: 4.4, reviews: 18000 },
    { name: 'Hootsuite',       logo: <HootsuiteLogo />,       rating: 4.3, reviews: 22000 },
    { name: 'ActiveCampaign',  logo: <ActiveCampaignLogo />,  rating: 4.6, reviews: 13000 },
    { name: 'Webflow',         logo: <WebflowLogo />,         rating: 4.6, reviews: 11000 },
  ],
  'SEO Tool': [
    { name: 'Ahrefs',             logo: <AhrefsLogo />,         rating: 4.8, reviews: 19000 },
    { name: 'SEMrush',            logo: <SemrushLogo />,        rating: 4.7, reviews: 21000 },
    { name: 'Moz Pro',            logo: <MozLogo />,            rating: 4.4, reviews: 12000 },
    { name: 'Screaming Frog',     logo: <ScreamingFrogLogo />,  rating: 4.6, reviews: 8700  },
    { name: 'Search Console',     logo: <SearchConsoleLogo />,  rating: 4.7, reviews: 67000 },
    { name: 'Surfer SEO',         logo: <SurferSEOLogo />,      rating: 4.5, reviews: 6200  },
  ],
};

/* ── Sub-components ──────────────────────────────── */
function StarRating({ rating }) {
  return (
    <div className="tool-card__stars">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={13} className={i <= Math.round(rating) ? 'star--filled' : 'star--empty'} />
      ))}
    </div>
  );
}

function ToolCard({ name, logo, rating, reviews, index }) {
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
      <div className="tool-card__logo-wrap">{logo}</div>
      <h4 className="tool-card__name">{name}</h4>
      <StarRating rating={rating} />
      <span className="tool-card__reviews">{(reviews / 1000).toFixed(0)}k đánh giá</span>
    </motion.div>
  );
}

/* ── Main component ──────────────────────────────── */
export default function ToolReviews() {
  const [active, setActive] = useState('AI Tool');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

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
          {categories.map(cat => (
            <button
              key={cat.label}
              className={`tool-reviews__tab${active === cat.label ? ' tool-reviews__tab--active' : ''}`}
              onClick={() => setActive(cat.label)}
            >
              {cat.icon}
              {cat.label}
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
            {tools[active].map((tool, i) => (
              <ToolCard key={tool.name} {...tool} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
