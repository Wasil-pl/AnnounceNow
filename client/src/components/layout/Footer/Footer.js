import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => (
  <footer>
    <div className={styles.footer}>
      <small>Copyright &copy; AnnounceNow {new Date().getFullYear()}</small>
    </div>
  </footer>
);

export default Footer;
