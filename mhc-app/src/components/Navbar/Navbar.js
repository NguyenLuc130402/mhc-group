import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, TrendingUp, Users, BarChart2, Zap, Target, LineChart } from 'lucide-react';
import logo from '../../assets/images/LogoMHC.png';
import './Navbar.css';

const serviceGroups = [
  {
    heading: 'MARKETING DIGITAL',
    items: [
      { label: 'Google Ads', desc: 'Tối ưu chiến dịch Search, Display & YouTube Ads', icon: <TrendingUp size={18} />, href: '#services' },
      { label: 'Lead Generation', desc: 'Thu hút và chuyển đổi khách hàng tiềm năng hiệu quả', icon: <Users size={18} />, href: '#services' },
    ],
  },
  {
    heading: 'PERFORMANCE',
    items: [
      { label: 'Affiliate Marketing', desc: 'Setup hệ thống affiliate, scale traffic & tối ưu conversion', icon: <Zap size={18} />, href: '#services' },
      { label: 'Performance Marketing', desc: 'Funnel, landing page và đo lường chuyển đổi toàn diện', icon: <BarChart2 size={18} />, href: '#services' },
    ],
  },
  {
    heading: 'ANALYTICS & CRO',
    items: [
      { label: 'Conversion Tracking', desc: 'Theo dõi & phân tích từng điểm chạm trong hành trình mua hàng', icon: <Target size={18} />, href: '#services' },
      { label: 'Báo cáo & Tối ưu', desc: 'Dashboard realtime, tối ưu liên tục theo dữ liệu thực', icon: <LineChart size={18} />, href: '#services' },
    ],
  },
];

const links = [
  { label: 'Trang chủ', href: '/'},
  { label: 'Giới thiệu', href: '#about' },
  { label: 'Dịch vụ', href: '#services', dropdown: true },
  { label: 'Văn hóa', href: '#culture' },
  { label: 'Review', href: '/reviews', external: true },
  { label: 'Blog', href: '#blog' },
  { label: 'Tuyển Dụng', href: '#careers' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
                      <span className="navbar__dropdown-cta-title">Tư vấn miễn phí</span>
                      <span className="navbar__dropdown-cta-sub">Liên hệ để được hỗ trợ miễn phí</span>
                    </div>
                    <a href="#contact" className="btn-primary navbar__dropdown-cta-btn">Liên hệ tư vấn</a>
                  </div>
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
            Liên hệ ngay
          </a>
        </div>
      )}
    </header>
  );
}
