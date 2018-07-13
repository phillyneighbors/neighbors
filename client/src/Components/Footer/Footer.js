import React from 'react';
import './Footer.css';
import classes from './Footer.css';



const Footer = () => {
    return (

      <div>
      <wrapper className="d-flex flex-column">
      <footer className="page-footer font-small fixed-bottom">
        <div className={classes.f00ter}>
        <div className="footer-copyright text-center py-3">
          © 2018 Copyright
        </div>
        </div>
      </footer>
      </wrapper>
</div>
  )
}

export default Footer;
