import React from 'react';
import './Navigation.css';
import classes from './Navigation.css';
import image from './logo1.png';
import { Link } from 'react-router-dom';

  const Navbar = () => {
  return (
    <div className={classes.Navbar}>
      <nav className="navbar navbar-expand-lg navbar-light">
        <img src={image} height="100px" alt='logo'/>
        <Link className="navbar-brand mx-auto d-block text-center order-0" to="/">
          <div className={classes.Title}>neighbors</div>
        </Link>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
        aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav">


            {/* Nav Link 1 */}
            <li className="nav-item active">
              <Link className="nav-link" to="/chatRoom">
                <span className={classes.NavLink}> chat</span>
              </Link>
            </li>


            {/* Nav Link 2 */}
            <li className="nav-item active">
              <Link className="nav-link" to="/explore">
                <span className={classes.NavLink}> explore</span>
              </Link>
            </li>

            {/* Nav Link 3 */}
            <li className="nav-item active">
              <Link className="nav-link" to="/about">
                <span className={classes.NavLink}>about </span>
              </Link>
            </li>

          </ul>
        </div>
      </nav>
    </div>
  )
}
export default Navbar;
