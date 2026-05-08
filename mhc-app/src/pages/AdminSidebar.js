import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Cpu, Users, Grid, Megaphone, Search,
  LogOut, ChevronRight, Settings,
} from 'lucide-react';
import { clearAuth, getUser } from '../utils/auth';
import { useLang } from '../contexts/LangContext';
import logo from '../assets/images/LogoMHC.png';

export const NAV = [
  { label: 'Dashboard',      icon: <LayoutDashboard size={16} />, key: 'all' },
  { label: 'AI Tool',        icon: <Cpu size={16} />,             key: 'AI Tool' },
  { label: 'CRM Tool',       icon: <Users size={16} />,           key: 'CRM Tool' },
  { label: 'SaaS Platforms', icon: <Grid size={16} />,            key: 'SaaS Platforms' },
  { label: 'Marketing Tool', icon: <Megaphone size={16} />,       key: 'Marketing Tool' },
  { label: 'SEO Tool',       icon: <Search size={16} />,          key: 'SEO Tool' },
];

export default function AdminSidebar({ activeKey, onNavChange }) {
  const navigate = useNavigate();
  const { t } = useLang();

  function handleNav(key) {
    if (onNavChange) onNavChange(key);
    else navigate('/admin');
  }

  return (
    <aside className="adm__sidebar">
      <div className="adm__logo">
        <img src={logo} alt="MHC" className="adm__logo-img" />
        <div className="adm__logo-text">
          <span className="adm__logo-mark">MHC</span>
          <span className="adm__logo-sub">Admin</span>
        </div>
      </div>

      <nav className="adm__nav">
        <span className="adm__nav-label">MENU</span>
        {NAV.map(n => (
          <button
            key={n.key}
            className={`adm__nav-item${activeKey === n.key ? ' adm__nav-item--active' : ''}`}
            onClick={() => handleNav(n.key)}
          >
            <span className="adm__nav-icon">{n.icon}</span>
            <span>{n.label}</span>
            {activeKey === n.key && <ChevronRight size={13} className="adm__nav-arrow" />}
          </button>
        ))}
        <div className="adm__nav-divider" />
        <button
          className={`adm__nav-item${activeKey === 'settings' ? ' adm__nav-item--active' : ''}`}
          onClick={() => handleNav('settings')}
        >
          <span className="adm__nav-icon"><Settings size={16} /></span>
          <span>Settings</span>
          {activeKey === 'settings' && <ChevronRight size={13} className="adm__nav-arrow" />}
        </button>
      </nav>

      <div className="adm__user">
        <span className="adm__username">{getUser()}</span>
      </div>
      <div className="adm__sidebar-footer">
        <button className="adm__logout" onClick={() => navigate('/')}>
          <LogOut size={15} /> {t('admin.home')}
        </button>
        <button className="adm__logout adm__logout--danger" onClick={() => { clearAuth(); navigate('/login'); }}>
          <LogOut size={15} /> {t('admin.logout')}
        </button>
      </div>
    </aside>
  );
}
