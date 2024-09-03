import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import GLightbox from 'glightbox';
import PureCounter from '@srexi/purecounterjs';
import Swiper from 'swiper';
import '../styles/Navbar.css';

import 'aos/dist/aos.css';
import 'glightbox/dist/css/glightbox.min.css';
import 'swiper/css';

const Navbar = ({ user, onLogout, cartCount, messageCount }) => {
  console.log(messageCount);
  
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

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid position-relative d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">
          <img src="assets/img/logo.png" alt=""/>
          <h1 className="sitename">Wo<span style={{color:"red"}}>Mall</span></h1>
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><Link to="/#hero" className="active">Home</Link></li>
            <li><Link to="/#about">About</Link></li>
            <li><Link to="/#services">Services</Link></li>
            <li><Link to="/#portfolio">Portfolio</Link></li>
            <li><Link to="/tenders">Tenders</Link></li>
            <li><Link to="/#team">Team</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li className="dropdown"><Link to="#"><span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></Link>
              <ul>
                <li><Link to="#">Dropdown 1</Link></li>
                <li className="dropdown"><Link to="#"><span>Deep Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></Link>
                  <ul>
                    <li><Link to="#">Deep Dropdown 1</Link></li>
                    <li><Link to="#">Deep Dropdown 2</Link></li>
                    <li><Link to="#">Deep Dropdown 3</Link></li>
                    <li><Link to="#">Deep Dropdown 4</Link></li>
                    <li><Link to="#">Deep Dropdown 5</Link></li>
                  </ul>
                </li>
                <li><Link to="#">Dropdown 2</Link></li>
                <li><Link to="#">Dropdown 3</Link></li>
                <li><Link to="#">Dropdown 4</Link></li>
              </ul>
            </li>
            <li><Link to="/#contact">Contact</Link></li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        {user ? (
          <ul className='user-icon'>
            <li>
              <Link to="/my_orders">
                <i className="bi bi-cart"></i>
                {cartCount > 0 && <span className="badge text-danger">{cartCount}</span>}
              </Link>
            </li>
            <li className="">
              <Link to="/quotation">
                <i className="bi bi-envelope toggle-dropdown"></i>
                {messageCount >= 0 && <span className="badge text-danger">{messageCount}</span>}
              </Link>
            </li>
            <li className="dropdown">
              <Link to="#">
                <i className="bi bi-person toggle-dropdown"></i>
              </Link>
              <ul id="user">
                <li>
                  {/* Logout button */}
                  <button className="btn-getstarted w-100" onClick={onLogout}>
                    Logout
                  </button>
                </li>
                <li className="dropdown">
                  <Link to="#">
                    <span>Profile Settings</span> 
                    <i className="bi bi-chevron-down toggle-dropdown"></i>
                  </Link>
                  <ul>
                    <li><Link to="/update-profile">Update Profile</Link></li>
                    <li><Link to="/update-password">Update Password</Link></li>
                    <li><Link to="/update-address">Update Address</Link></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        ) : (
          <Link className="btn-getstarted" to="/login">Get Started</Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
