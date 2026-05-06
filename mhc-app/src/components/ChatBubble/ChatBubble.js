import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ChevronDown } from 'lucide-react';
import { useLang } from '../../contexts/LangContext';
import './ChatBubble.css';

export default function ChatBubble() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSent(false), 400);
  };

  return (
    <div className="chatbubble">
      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbubble__panel"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="chatbubble__header">
              <div className="chatbubble__header-info">
                <div className="chatbubble__avatar">MHC</div>
                <div>
                  <p className="chatbubble__header-name">MHC Group</p>
                  <p className="chatbubble__header-status">
                    <span className="chatbubble__dot" /> {t('chatbubble.online')}
                  </p>
                </div>
              </div>
              <button className="chatbubble__close" onClick={handleClose}>
                <ChevronDown size={18} />
              </button>
            </div>

            <div className="chatbubble__body">
              {sent ? (
                <div className="chatbubble__success">
                  <div className="chatbubble__success-icon">✓</div>
                  <p className="chatbubble__success-title">{t('chatbubble.successTitle')}</p>
                  <p className="chatbubble__success-sub">{t('chatbubble.successSub')}</p>
                  <button className="chatbubble__submit" onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }); }}>
                    {t('chatbubble.sendAnother')}
                  </button>
                </div>
              ) : (
                <>
                  <p className="chatbubble__greeting">{t('chatbubble.greeting')}</p>
                  <form className="chatbubble__form" onSubmit={handleSubmit}>
                    <div className="chatbubble__field">
                      <label>{t('chatbubble.name')}</label>
                      <input value={form.name} onChange={e => set('name', e.target.value)} placeholder={t('chatbubble.namePlaceholder')} required />
                    </div>
                    <div className="chatbubble__field">
                      <label>{t('chatbubble.email')}</label>
                      <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder={t('chatbubble.emailPlaceholder')} required />
                    </div>
                    <div className="chatbubble__field">
                      <label>{t('chatbubble.phone')}</label>
                      <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder={t('chatbubble.phonePlaceholder')} />
                    </div>
                    <div className="chatbubble__field">
                      <label>{t('chatbubble.message')}</label>
                      <textarea rows={3} value={form.message} onChange={e => set('message', e.target.value)} placeholder={t('chatbubble.messagePlaceholder')} required />
                    </div>
                    <button className="chatbubble__submit" type="submit" disabled={loading}>
                      {loading ? t('chatbubble.sending') : <><Send size={14} /> {t('chatbubble.submit')}</>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={`chatbubble__btn${open ? ' chatbubble__btn--open' : ''}`}
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        animate={open ? {} : { y: [0, -6, 0] }}
        transition={open ? {} : { duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={22} /></motion.span>
            : <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><MessageCircle size={22} /></motion.span>
          }
        </AnimatePresence>
        {!open && <span className="chatbubble__ping" />}
      </motion.button>
    </div>
  );
}
