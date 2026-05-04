import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import './CTABanner.css';

const contacts = [
  {
    icon: Phone,
    label: 'Hotline',
    value: '+84 376 015 024',
    href: 'tel:+84376015024',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'xbotteam37@gmail.com',
    href: 'mailto:xbotteam37@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Địa chỉ',
    value: 'No. 88 Vo Thi Sau, Vinh City',
    href: null,
  },
];

export default function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="cta-banner" id="contact">
      <div className="cta-banner__orb cta-banner__orb--1" />
      <div className="cta-banner__orb cta-banner__orb--2" />
      <div className="cta-banner__dots" />

      <div className="container">
        <motion.div
          ref={ref}
          className="cta-banner__inner"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="cta-banner__badge"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Bắt đầu ngay hôm nay
          </motion.span>

          <motion.h2
            className="cta-banner__heading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Sẵn sàng tăng trưởng<br />
            <span className="cta-banner__heading--accent">doanh thu thực sự?</span>
          </motion.h2>

          <motion.p
            className="cta-banner__sub"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Liên hệ với chúng tôi để được tư vấn miễn phí. Đội ngũ chuyên gia MHC
            luôn sẵn sàng đồng hành cùng bạn.
          </motion.p>

          <motion.div
            className="cta-banner__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <a href="tel:+84376015024" className="btn-primary cta-banner__btn-primary">
              Gọi ngay tư vấn miễn phí <ArrowRight size={16} />
            </a>
            <a href="mailto:xbotteam37@gmail.com" className="cta-banner__btn-ghost">
              Gửi email cho chúng tôi
            </a>
          </motion.div>

          <motion.div
            className="cta-banner__contacts"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {contacts.map((c) => (
              <div key={c.label} className="cta-banner__contact-card">
                <div className="cta-banner__contact-icon">
                  <c.icon size={17} />
                </div>
                <div className="cta-banner__contact-body">
                  <span className="cta-banner__contact-label">{c.label}</span>
                  {c.href ? (
                    <a href={c.href} className="cta-banner__contact-value cta-banner__contact-link">
                      {c.value}
                    </a>
                  ) : (
                    <span className="cta-banner__contact-value">{c.value}</span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
