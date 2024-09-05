import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AOS from 'aos';
import GLightbox from 'glightbox';
import PureCounter from '@srexi/purecounterjs';
import Swiper from 'swiper';
import '../styles/Navbar.css';

import 'aos/dist/aos.css';
import 'glightbox/dist/css/glightbox.min.css';
import 'swiper/css';

const Navbar = ({ user, onLogout, cartCount, messageCount }) => {
  const location = useLocation();

  useEffect(() => {
    const toggleScrolled = () => {
      const selectBody = document.querySelector('body');
      const selectHeader = document.querySelector('#header');
      if (!selectHeader || (!selectHeader.classList.contains('scroll-up-sticky') &&
          !selectHeader.classList.contains('sticky-top') &&
          !selectHeader.classList.contains('fixed-top'))) return;
      window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
    };

    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggleBtn) {
      const mobileNavToogle = () => {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
      };

      mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

      return () => {
        mobileNavToggleBtn.removeEventListener('click', mobileNavToogle);
      };
    }
  }, []);

  useEffect(() => {
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
      const toggleScrollTop = () => {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      };

      scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });

      window.addEventListener('load', toggleScrollTop);
      document.addEventListener('scroll', toggleScrollTop);

      return () => {
        scrollTop.removeEventListener('click', toggleScrollTop);
        window.removeEventListener('load', toggleScrollTop);
        document.removeEventListener('scroll', toggleScrollTop);
      };
    }
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    const glightbox = GLightbox({
      selector: '.glightbox'
    });

    new PureCounter();

    const initSwiper = () => {
      document.querySelectorAll(".init-swiper").forEach(swiperElement => {
        let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());
        new Swiper(swiperElement, config);
      });
    };
    window.addEventListener("load", initSwiper);

    return () => {
      window.removeEventListener("load", initSwiper);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleLinkClick = () => {
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggleBtn) {
      document.querySelector('body').classList.remove('mobile-nav-active');
      mobileNavToggleBtn.classList.remove('bi-x');
      mobileNavToggleBtn.classList.add('bi-list');
    }
  };

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid position-relative d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0" onClick={handleLinkClick}>
          <img src="assets/img/logo.png" alt="" />
          <h1 className="sitename">Wo<span style={{ color: "red" }}>Mall</span></h1>
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><Link to="/" className="active" onClick={handleLinkClick}>Home</Link></li>
            <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
            <li><Link to="/services" onClick={handleLinkClick}>Services</Link></li>
            <li className="dropdown">
            <Link to="#" onClick={handleLinkClick}>
              <span>Careers</span> <i className="bi bi-chevron-down toggle-dropdown"></i>
            </Link>
            <ul>
              <li><Link to="/job_openings?category=job opening" onClick={handleLinkClick}>Job Openings</Link></li>
              <li><Link to="/job_openings?category=graduate_trainee" onClick={handleLinkClick}>Graduate Trainee Programs</Link></li>
              <li><Link to="/job_openings?category=internships" onClick={handleLinkClick}>Internships</Link></li>
              <li><Link to="/job_openings?category=faqs" onClick={handleLinkClick}>FAQ'S</Link></li>
            </ul>
          </li>
            <li><Link to="/tenders" onClick={handleLinkClick}>Tenders</Link></li>
            <li><Link to="/team" onClick={handleLinkClick}>Team</Link></li>
            <li><Link to="/blog" onClick={handleLinkClick}>Blog</Link></li>
            <li className="dropdown">
              <Link to="#" onClick={handleLinkClick}><span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></Link>
              <ul>
                <li><Link to="#" onClick={handleLinkClick}>Dropdown 1</Link></li>
                <li className="dropdown">
                  <Link to="#" onClick={handleLinkClick}><span>Deep Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></Link>
                  <ul>
                    <li><Link to="#" onClick={handleLinkClick}>Deep Dropdown 1</Link></li>
                    <li><Link to="#" onClick={handleLinkClick}>Deep Dropdown 2</Link></li>
                    <li><Link to="#" onClick={handleLinkClick}>Deep Dropdown 3</Link></li>
                    <li><Link to="#" onClick={handleLinkClick}>Deep Dropdown 4</Link></li>
                    <li><Link to="#" onClick={handleLinkClick}>Deep Dropdown 5</Link></li>
                  </ul>
                </li>
                <li><Link to="#" onClick={handleLinkClick}>Dropdown 2</Link></li>
                <li><Link to="#" onClick={handleLinkClick}>Dropdown 3</Link></li>
                <li><Link to="#" onClick={handleLinkClick}>Dropdown 4</Link></li>
              </ul>
            </li>
            <li><Link to="/#contact" onClick={handleLinkClick}>Contact</Link></li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        {user ? (
          <ul className='user-icon'>
            <li>
              <Link to="/my_orders" onClick={handleLinkClick}>
                <i className="bi bi-cart"></i>
                {cartCount > 0 && <span className="badge text-danger">{cartCount}</span>}
              </Link>
            </li>
            <li className="">
              <Link to="/quotation" onClick={handleLinkClick}>
                <i className="bi bi-envelope toggle-dropdown"></i>
                {messageCount >= 0 && <span className="badge text-danger">{messageCount}</span>}
              </Link>
            </li>
            <li className="dropdown">
              <Link to="#" onClick={handleLinkClick}>
                <i className="bi bi-person toggle-dropdown"></i>
              </Link>
              <ul id="user">
                <li>
                  {/* Logout button */}
                  <button className="btn-getstarted w-100" onClick={() => { handleLinkClick(); onLogout(); }}>
                    Logout
                  </button>
                </li>
                <li className="dropdown">
                  <Link to="#" onClick={handleLinkClick}>
                    <span>Profile Settings</span> 
                    <i className="bi bi-chevron-down toggle-dropdown"></i>
                  </Link>
                  <ul>
                    <li><Link to="/update-profile" onClick={handleLinkClick}>Update Profile</Link></li>
                    <li><Link to="/update-password" onClick={handleLinkClick}>Update Password</Link></li>
                    <li><Link to="/update-address" onClick={handleLinkClick}>Update Address</Link></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        ) : (
          <Link className="btn-getstarted" to="/login" onClick={handleLinkClick}>Get Started</Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
