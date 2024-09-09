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
    const toggleDropdown = (e) => {
      if (document.querySelector('body').classList.contains('mobile-nav-active')) {
        e.preventDefault();
        e.stopPropagation(); // Prevent event from closing the entire menu
  
        const target = e.target;
        
        // Ensure the dropdown is clicked
        const submenu = target.nextElementSibling || target.parentElement?.nextElementSibling;
  
        if (submenu && submenu.tagName === 'UL') { // Ensure the submenu is a <ul>
          submenu.classList.toggle('dropdown-active');
        } else {
          console.error('Dropdown submenu not found or is not a UL');
        }
      }
    };
  
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    const dropdowns = document.querySelectorAll('.navmenu .dropdown > a');
  
    if (mobileNavToggleBtn) {
      const mobileNavToggle = () => {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
      };
  
      mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
      dropdowns.forEach(dropdown => dropdown.addEventListener('click', toggleDropdown));
  
      return () => {
        mobileNavToggleBtn.removeEventListener('click', mobileNavToggle);
        dropdowns.forEach(dropdown => dropdown.removeEventListener('click', toggleDropdown));
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

  const handleLinkClick = (e) => {
    const isDropdownLink = e.target.closest('.dropdown');
    if (!isDropdownLink) {
      const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
      if (mobileNavToggleBtn) {
        document.querySelector('body').classList.remove('mobile-nav-active');
        mobileNavToggleBtn.classList.remove('bi-x');
        mobileNavToggleBtn.classList.add('bi-list');
      }
    }
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid position-relative d-flex align-items-center justify-content-between">
        <Link to="/" className={`logo d-flex align-items-center me-auto me-xl-0 ${isActive('/')}`} onClick={handleLinkClick}>
          <h1 className="sitename">Wo<span style={{ color: "red" }}>Mall</span></h1>
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><Link to="/" className={isActive('/')} onClick={handleLinkClick}>Home</Link></li>
            <li><Link to="/about" className={isActive('/about')} onClick={handleLinkClick}>About</Link></li>
            <li><Link to="/services" className={isActive('/services')} onClick={handleLinkClick}>Services</Link></li>
            <li><Link to="/tenders" className={isActive('/tenders')} onClick={handleLinkClick}>Tenders</Link></li>
            <li className="dropdown">
              <Link to="#" onClick={handleLinkClick} className={isActive('/job_openings') ? 'active' : ''}>
                <span>Careers</span> <i className="bi bi-chevron-down toggle-dropdown"></i>
              </Link>
              <ul>
                <li><Link to="/job_openings?category=job opening" className={isActive('/job_openings?category=job opening')} onClick={handleLinkClick}>Job Openings</Link></li>
                <li><Link to="/job_openings?category=graduate_trainee" className={isActive('/job_openings?category=graduate_trainee')} onClick={handleLinkClick}>Graduate Trainee Programs</Link></li>
                <li><Link to="/job_openings?category=internships" className={isActive('/job_openings?category=internships')} onClick={handleLinkClick}>Internships</Link></li>
                <li><Link to="/job_openings?category=faqs" className={isActive('/job_openings?category=faqs')} onClick={handleLinkClick}>FAQ'S</Link></li>
              </ul>
            </li>
            <li className="dropdown">
              <Link to="#" onClick={handleLinkClick} className={isActive('/special-offers') ? 'active' : ''}>
                <span>Resources</span>
                <i className="bi bi-chevron-down toggle-dropdown"></i>
              </Link>
              <ul>
                <li><Link to="/special-offers" className={isActive('/special-offers')} onClick={handleLinkClick}>Special Offers</Link></li>
                <li><Link to="/events" className={isActive('/events')} onClick={handleLinkClick}>Events</Link></li>
                <li><Link to="/community" className={isActive('/community')} onClick={handleLinkClick}>Community</Link></li>
                <li><Link to="/case-studies" className={isActive('/case-studies')} onClick={handleLinkClick}>Case Studies</Link></li>
              </ul>
            </li>
            <li><Link to="/contact" className={isActive('/contact')} onClick={handleLinkClick}>Contact</Link></li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        {user ? (
          <ul className='user-icon'>
            <li>
              <Link to="/my_orders" onClick={handleLinkClick}>
                <i className="bi bi-cart"></i>
                {cartCount >= 0 && <span className="badge text-danger">{cartCount}</span>}
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
                  <button
                    className="btn-getstarted w-100"
                    onClick={(e) => {
                      handleLinkClick(e); // Pass the event
                      onLogout();
                    }}
                  >
                    Logout
                  </button>
                </li>
                <li className="dropdown">
                  <Link to="#" onClick={handleLinkClick}>
                    <span>Profile Settings</span> 
                    <i className="bi bi-chevron-down toggle-dropdown"></i>
                  </Link>
                  <ul>
                    <li><Link to="/profile" onClick={handleLinkClick}>Profile</Link></li>
                    <li><Link to="/update-password" onClick={handleLinkClick}>Update Password</Link></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        ) : (
          <Link to="/login" className="btn-getstarted">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
