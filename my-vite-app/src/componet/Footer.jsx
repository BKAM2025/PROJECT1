import React from 'react';
import styles from '../Footer.module.css';

const qrCode = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ExclusiveApp";
const googlePlay = "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg";
const appStore = "https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__grid}>
        <div className={styles.footer__column}>
          <h3 className={styles.footer__logo}>Exclusive</h3>
          <p className={styles.footer__subscribe}>Subscribe</p>
          <p className={styles.footer__text}>Get 10% off your first order</p>
          <div className={styles.footer__inputBox}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.footer__input}
            />
            <button className={styles.footer__button}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M2 12h20m-8-8l8 8-8 8" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.footer__column}>
          <h3 className={styles.footer__title}>Support</h3>
          <p className={styles.footer__address}>
            tunis, tunis,<br />
          </p>
          <p className={styles.footer__email}>bochrabenromdhane@gmail.com</p>
          <p className={styles.footer__phone}>+216 51.71.48.88</p>
        </div>

        <div className={styles.footer__column}>
          <h3 className={styles.footer__title}>Account</h3>
          <nav>
            <ul className={styles.footer__links}>
              <li><a href="#">My Account</a></li>
              <li><a href="#">Login / Register</a></li>
              <li><a href="#">Cart</a></li>
              <li><a href="#">Wishlist</a></li>
              <li><a href="#">Shop</a></li>
            </ul>
          </nav>
        </div>

        <div className={styles.footer__column}>
          <h3 className={styles.footer__title}>Quick Link</h3>
          <nav>
            <ul className={styles.footer__links}>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms Of Use</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>

        <div className={styles.footer__column}>
          <h3 className={styles.footer__title}>Download App</h3>
          <p className={styles.footer__appText}>Save $3 with App New User Only</p>
          <div className={styles.footer__downloadSection}>
            <img src={qrCode} alt="QR Code" className={styles.footer__qr} />
            <div className={styles.footer__storeBtns}>
              <img src={googlePlay} alt="Google Play" />
              <img src={appStore} alt="App Store" />
            </div>
          </div>
          <div className={styles.footer__social}>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
      <div className={styles.footer__copyright}>
        <p>© Copyright Rimel 2025. All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;