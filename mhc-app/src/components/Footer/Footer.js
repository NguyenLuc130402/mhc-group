import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import logo from '../../assets/images/LogoMHC.png';
import { useLang } from '../../contexts/LangContext';
import './Footer.css';

const socials = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: 'Zalo',
    href: 'https://zalo.me',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#0068FF"/>
        <text x="3" y="16.5" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="11" fill="white" letterSpacing="0.5">Zalo</text>
      </svg>
    ),
  },
];

function FooterCol({ col }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="footer__col">
      <button className="footer__col-toggle" onClick={() => setOpen(v => !v)}>
        <span className="footer__col-heading">{col.heading}</span>
        <ChevronDown size={15} className={`footer__col-chevron${open ? ' footer__col-chevron--open' : ''}`} />
      </button>
      <ul className={`footer__col-links${open ? ' footer__col-links--open' : ''}`}>
        {col.links.map(l => (
          <li key={l}><a href="#top" className="footer__col-link">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { t } = useLang();
  const cols = t('footer.cols');

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#top" className="footer__logo">
            <img src={logo} alt="MHC Group" className="footer__logo-img" />
          </a>
          <p className="footer__tagline">{t('footer.tagline')}</p>
          <address className="footer__address">
            No. 88 Vo Thi Sau Street,<br />
            Vinh City, Nghe An, Vietnam
          </address>
          <div className="footer__socials">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                className="footer__social"
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {cols.map(col => (
          <FooterCol key={col.heading} col={col} />
        ))}
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span className="footer__copy">© {new Date().getFullYear()} MHC Group. All rights reserved.</span>
          <div className="footer__bottom-links">
            <a href="#top" className="footer__bottom-link">{t('footer.privacy')}</a>
            <a href="#top" className="footer__bottom-link">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
