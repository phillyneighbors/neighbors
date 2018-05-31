import React, { Component } from 'react';
import classes from './Login.css';
// import MapContainer from '../Components/Map/Map'
import Button from '../../Components/UI/Button/Button';
import WindowHeader from '../../Components/UI/WindowHeader/WindowHeader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextInput from '../../Components/UI/TextInput/TextInput';
import * as actionCreators from '../../store/actions/loginActions';


class Login extends Component {
  componentDidUpdate(prevProps) {
    console.log(prevProps)
    if (this.props.loggedIn){
      console.log("LOGGED IN!")
      this.props.history.push('/chatRoom')
    }
  }
  render() {
    return (
      <div className="container">
      <div className="row">
      <div className={classes.LoginForm}>
        <WindowHeader position="center">Login/SignUp</WindowHeader>
        <form className={classes.Form}>
          <TextInput
            type="text"
            placeholder="username"
            changeHandler={event => (this.props.handleUsernameChange(event.target.value))} />

          <TextInput
            type="password"
            placeholder="password"
            changeHandler={event => (this.props.handlePasswordChange(event.target.value))} />
        </form>
        <Button clicked={this.props.login}>Log In</Button>
      </div>
      </div>
      </div>
      
    )
  };
}

const mapStateToProps = state => {
  return {
    username: state.loginReducer.username,
    password: state.loginReducer.password,
    loggedIn: state.loginReducer.loggedIn,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleUsernameChange: (username) => dispatch(actionCreators.updateUsername(username)),
    handlePasswordChange: (password) => dispatch(actionCreators.updatePassword(password)),
    login: () => dispatch(actionCreators.userLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
