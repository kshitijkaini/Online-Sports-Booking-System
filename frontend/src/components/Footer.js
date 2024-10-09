const Footer = () => {
  return (
    <footer class="footer">
      <div class="container footer-container">
        <div class="footer-row">
          <div class="footer-identity">
            <a href="#home" class="nav-logo">
              Khel<span>Center</span>
            </a>
            <p class="footer-description">Play for your body and mind</p>
          </div>
          <div class="footer-feature">
            <div class="col footer-feature-1">
              <h4 class="footer-feature-title">About</h4>
              <ul class="footer-feature-list">
                <li>
                  <a href="#about">About Us</a>
                </li>

                <li>
                  <a href="#term-condition">Terms & Agreements</a>
                </li>
              </ul>
            </div>
            <div class="col">
              <h4 class="footer-feature-title">Support</h4>
              <ul class="footer-feature-list">
                <li>
                  <a href="#faq">Faq</a>
                </li>
                <li>
                  <a href="#support">Support Center</a>
                </li>
                <li>
                  <a href="#privacy-policy">Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div class="col">
              <h4 class="footer-feature-title">Contact Us</h4>
              <ul class="footer-feature-list">
                <li>
                  <a href="#gmail">
                    <i class="ri-mail-line"></i> contact@gmail.com
                  </a>
                </li>
                <li>
                  <a href="#address">
                    <i class="ri-map-pin-line"></i> Lalitpur Nepal, 2 Feb 2023
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          All rights reserved, &copy; 2023/2079 Team Sahara
        </div>
      </div>
    </footer>
  );
};

export default Footer;
