import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, TrendingUp, Users, BarChart2 } from 'lucide-react';
import logo from '../../assets/images/LogoMHC.png';
import './Navbar.css';

const services = [
  {
    label: 'Google Ads',
    desc: 'Search Ads, Demand keywords, Lead generation',
    icon: <TrendingUp />,
    href: '#services',
  },
  {
    label: 'Affiliate Marketing',
    desc: 'Setup hệ thống affiliate, Scale traffic, Tối ưu conversion',
    icon: <Users />,
    href: '#services',
  },
  {
    label: 'Performance Marketing',
    desc: 'Funnel, Landing page, Conversion tracking',
    icon: <BarChart2 />,
    href: '#services',
  },
];
const links = [
  { label: 'Trang chủ', href: '#top' },
  { label: 'Giới thiệu', href: '#about' },
  { label: 'Dịch vụ', href: '#services', dropdown: true },
  { label: 'Văn hóa', href: '#culture' },
  { label: 'Blog', href: '#blog' },
  { label: 'Tuyển Dụng', href: '#careers' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#top" className="navbar__logo">
          <img src={logo} alt="MHC Group" className="navbar__logo-img" />
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">MHC Group</span>
            <span className="navbar__logo-tagline">We Don't Just Drive Traffic — We Drive Profit</span>
          </div>
        </a>

        <nav className="navbar__links">
          {links.map(l => l.dropdown ? (
            <div
              key={l.label}
              className={`navbar__dropdown-wrap${dropdownOpen ? ' navbar__dropdown-wrap--open' : ''}`}
              ref={dropdownRef}
            >
              <button
                className="navbar__link navbar__link--dropdown"
                onClick={() => setDropdownOpen(v => !v)}
              >
                {l.label}
                <ChevronDown size={14} className="navbar__chevron" />
              </button>
              <div className="navbar__dropdown">
                <div className="navbar__dropdown-inner">
                  {services.map(s => (
                    <a key={s.label} href={s.href} className="navbar__dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <div className="navbar__dropdown-icon">{s.icon}</div>
                      <div className="navbar__dropdown-content">
                        <span className="navbar__dropdown-label">{s.label}</span>
                        <span className="navbar__dropdown-desc">{s.desc}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <a key={l.label} href={l.href} className="navbar__link">{l.label}</a>
          ))}
        </nav>

        <a href="#contact" className="btn-primary navbar__cta">Liên hệ ngay</a>

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
                  {services.map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="navbar__mobile-service-item"
                      onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                    >
                      <div className="navbar__dropdown-icon">{s.icon}</div>
                      <span>{s.label}</span>
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
            Liên hệ ngay
          </a>
        </div>
      )}
    </header>
  );
}
