import styles from "./FooterContacts.module.css";
import contacts from "../../../data/contacts";
import InstagramIcon from "../../../shared/components/icons/InstagramIcon";
import WhatsappIcon from "../../../shared/components/icons/WhatsappIcon";

function FooterContacts() {
  const { phone, address, hours, socials } = contacts;

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <span className={styles.label}>Phone</span>
        <p>{phone}</p>
      </div>

      <div className={styles.card}>
        <span className={styles.label}>Socials</span>
        <div className={styles.socials}>
          <a href={socials.instagram} target="_blank" rel="noreferrer">
            <InstagramIcon />
          </a>
          <a href={socials.whatsapp} target="_blank" rel="noreferrer">
            <WhatsappIcon />
          </a>
        </div>
      </div>

      <div className={styles.card}>
        <span className={styles.label}>Address</span>
        <p>{address}</p>
      </div>

      <div className={styles.card}>
        <span className={styles.label}>Working Hours</span>
        <p>{hours}</p>
      </div>
    </div>
  );
}

export default FooterContacts;
