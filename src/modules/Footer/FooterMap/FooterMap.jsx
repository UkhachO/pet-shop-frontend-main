import styles from "./FooterMap.module.css";

const FooterMap = () => {
  return (
    <div className={styles.mapWrapper}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.2316267311785!2d13.401903676707766!3d52.511147136884894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e27db4748a5%3A0x1d538c01013c2c7!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin!5e0!3m2!1sru!2sde!4v1753209931905!5m2!1sru!2sde"
        width="100%"
        height="450"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default FooterMap;
