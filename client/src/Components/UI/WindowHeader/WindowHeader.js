import React from 'react';
import classes from './windowHeader.css';


const WindowHeader = (props) => {
  let style = {};
  if (props.position === "center") {
    style={textAlign: "center"}
  }
  return (
    <div className={classes.WindowHeader} style={style}>{props.children} 
      {/* <img src={image} height="40px" width="50px" alignItems="right" alt='chat0-logo'/> */}

     </div>
  )
}

export default WindowHeader;
