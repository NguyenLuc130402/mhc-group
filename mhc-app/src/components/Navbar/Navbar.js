import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, TrendingUp, Users, BarChart2, Zap, Target, LineChart } from 'lucide-react';
import logo from '../../assets/images/LogoMHC.png';
import { useLang } from '../../contexts/LangContext';
import './Navbar.css';

const ITEM_ICONS = [
  [<TrendingUp size={18} />, <Users size={18} />],
  [<Zap size={18} />, <BarChart2 size={18} />],
  [<Target size={18} />, <LineChart size={18} />],
];

export default function Navbar() {
  const { lang, toggle, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const serviceGroups = t('navbar.serviceGroups').map((group, gi) => ({
    heading: group.heading,
    items: group.items.map((item, ii) => ({
      ...item,
      icon: ITEM_ICONS[gi][ii],
      href: '#services',
    })),
  }));

  const links = [
    { label: t('navbar.home'), href: '/' },
    { label: t('navbar.about'), href: '#about' },
    { label: t('navbar.services'), href: '#services', dropdown: true },
    { label: t('navbar.culture'), href: '#culture' },
    { label: t('navbar.review'), href: '/reviews', external: true },
    { label: t('navbar.blog'), href: '#blog' },
    { label: t('navbar.careers'), href: '#careers' },
  ];

  const cta = t('navbar.dropdownCta');

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="/" className="navbar__logo">
          <img src={logo} alt="MHC Group" className="navbar__logo-img" />
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">MHC Group</span>
            <span className="navbar__logo-tagline">We Don't Just Drive Traffic — We Drive Profit</span>
          </div>
        </a>

        <nav className="navbar__links">
          {links.map(l => l.dropdown ? (
            <div key={l.label} className="navbar__dropdown-wrap">
              <span className="navbar__link navbar__link--dropdown">
                {l.label}
                <ChevronDown size={14} className="navbar__chevron" />
              </span>
              <div className="navbar__dropdown">
                <div className="navbar__dropdown-inner">
                  <div className="navbar__dropdown-grid">
                    {serviceGroups.map(group => (
                      <div key={group.heading} className="navbar__dropdown-group">
                        <span className="navbar__dropdown-group-heading">{group.heading}</span>
                        {group.items.map(item => (
                          <a key={item.label} href={item.href} className="navbar__dropdown-item">
                            <div className="navbar__dropdown-icon">{item.icon}</div>
                            <div className="navbar__dropdown-content">
                              <span className="navbar__dropdown-label">{item.label}</span>
                              <span className="navbar__dropdown-desc">{item.desc}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="navbar__dropdown-cta">
                    <div className="navbar__dropdown-cta-text">
                      <span className="navbar__dropdown-cta-title">{cta.title}</span>
                      <span className="navbar__dropdown-cta-sub">{cta.sub}</span>
                    </div>
                    <a href="#contact" className="btn-primary navbar__dropdown-cta-btn">{cta.btn}</a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <a key={l.label} href={l.href} className="navbar__link">{l.label}</a>
          ))}
        </nav>

        <button className="navbar__lang-toggle" onClick={toggle} aria-label="Toggle language">
          {lang === 'vi' ? 'EN' : 'VI'}
        </button>

        <a href="#contact" className="btn-primary navbar__cta">{t('navbar.contact')}</a>

        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="navbar__mobile-menu">
          {links.map(l => l.dropdown ? (
            <div key={l.label}>
              <button
                className="navbar__mobile-link--toggle"
                onClick={() => setMobileServicesOpen(v => !v)}
              >
                {l.label}
                <ChevronDown size={16} className={mobileServicesOpen ? 'navbar__chevron--up' : ''} />
              </button>
              {mobileServicesOpen && (
                <div className="navbar__mobile-services">
                  {serviceGroups.flatMap(g => g.items).map(item => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="navbar__mobile-service-item"
                      onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                    >
                      <div className="navbar__dropdown-icon">{item.icon}</div>
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <a
              key={l.label}
              href={l.href}
              className="navbar__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary" onClick={() => setMenuOpen(false)}>
            {t('navbar.contact')}
          </a>
        </div>
      )}
    </header>
  );
}
