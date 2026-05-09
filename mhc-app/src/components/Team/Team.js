import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import imgManh  from '../../assets/team-image/NguyenVanManh.jpg';
import imgChien from '../../assets/team-image/HoangVanChien.png';
import imgCuong from '../../assets/team-image/NguyenVanCuong.jpg';
import imgThai  from '../../assets/team-image/NguyenVanThai.jpg';
import imgHung  from '../../assets/team-image/NguyenVietHung.jpg';
import { useLang } from '../../contexts/LangContext';
import './Team.css';

const MEMBER_STATIC = [
  { img: imgManh,  name: 'Nguyễn Văn Mạnh', title: 'CEO & Co-Founder'   },
  { img: imgChien, name: 'Hoàng Văn Chiến',       title: 'Leader' },
  { img: imgCuong, name: 'Lê Minh Cường',        title: 'Leader'     },
  { img: imgThai,  name: 'Nguyễn Văn Thái',       title: 'Leader'     },
  { img: imgHung,  name: 'Nguyễn Viết Hùng',      title: 'Leader'       },
 
];

function MemberCard({ member, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className="team-card"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="team-card__img-wrap">
        <img
          src={member.img}
          alt={member.name}
          className="team-card__img"
          loading="lazy"
        />
      </div>
      <div className="team-card__body">
        <h3 className="team-card__name">{member.name}</h3>
        <span className="team-card__title">{member.title}</span>
        <p className="team-card__bio">"{member.bio}"</p>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const { t } = useLang();
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const memberBios = t('team.members');
  const members = MEMBER_STATIC.map((m, i) => ({ ...m, bio: memberBios[i]?.bio || m.bio }));

  return (
    <section className="team">
      <div className="container">
        <motion.div
          ref={ref}
          className="team__header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">{t('team.label')}</span>
          <h2 className="team__heading">
            {t('team.headingLine1')}<br />
            {t('team.headingLine2')}
          </h2>
          <p className="team__sub">{t('team.sub')}</p>
        </motion.div>

        <div className="team__grid">
          {members.map((m, i) => (
            <MemberCard key={i} member={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
