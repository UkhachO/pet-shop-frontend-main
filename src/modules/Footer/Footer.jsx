import Section from "../../shared/components/SectionTitle/SectionTitle";
import FooterContacts from "./FooterContacts/FooterContacts";
import FooterMap from "./FooterMap/FooterMap";

const Footer = () => {
  return (
    <>
      <Section title="Contact">
        <FooterContacts />
      </Section>
      <FooterMap />
    </>
  );
};

export default Footer;
