import React from 'react';
import classes from './TextInput.css'
const TextInput = (props) => {
  return (
    <input className={classes.Input} type={props.type} placeholder={props.placeholder} onChange={props.changeHandler}/>
  )
}

export default TextInput
