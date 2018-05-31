import React from 'react';
import classes from './navigation.css';
import image from './logo.png'
import Avatar from '../Avatar/Avatar'
const Navbar = (props) => {

  return (

    <div className={classes.NavBar}>
    
    <div className={classes.headerImage}> <img src={image} height="100px" /></div> <h1 className={classes.Title}> neighbors</h1> 
        <div className={classes.Profile}>
          <Avatar context='navbar' username={props.username}/>
            </div>
       </div>


  )
}

export default Navbar;
