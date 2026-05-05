import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import img1 from '../../assets/team-image/z7792391558541_fa3f6d477bf041a87bb0e7b2825bb367.jpg';
import img2 from '../../assets/team-image/z7792508427042_66e65ce160b76e896177eba5f686313b.jpg';
import img3 from '../../assets/team-image/z7792501428848_fce4a81695469ddabe59b277964f8b5c.jpg';
import img4 from '../../assets/team-image/z7792499492102_87d37fcea202e05367652a0a61fd31ea.jpg';
import img5 from '../../assets/team-image/z7792498246382_bac2b086fd89fb717ca5ebd5209c6afe.jpg';
import './Team.css';

const MEMBERS = [
  { img: img1, name: 'Nguyễn Văn A',  title: 'CEO & Co-Founder',    bio: 'Dẫn dắt bằng tầm nhìn, xây dựng bằng đam mê.' },
  { img: img2, name: 'Trần Hữu B',   title: 'Marketing Director',  bio: 'Chuyên gia tối ưu hóa chuyển đổi.' },
  { img: img3, name: 'Lê Minh C',   title: 'Lead Developer',      bio: 'Xây dựng hệ thống bằng sự tử tế.' },
  { img: img4, name: 'Phạm Thu D',   title: 'SEO Strategist',      bio: 'Biến traffic thành lợi nhuận thực sự.' },
  { img: img5, name: 'Hoàng Văn E',    title: 'Data Analyst',        bio: 'Mọi quyết định đều bắt đầu từ dữ liệu.' },
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
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
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
          <span className="section-label">Đội ngũ</span>
          <h2 className="team__heading">
            Con người đứng sau<br />những con số
          </h2>
          <p className="team__sub">
            Chúng tôi là những chuyên gia tận tâm, kết hợp dữ liệu và sáng tạo để mang lại kết quả thực sự cho khách hàng.
          </p>
        </motion.div>

        <div className="team__grid">
          {MEMBERS.map((m, i) => (
            <MemberCard key={i} member={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
