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

  state = {
    username: '',
    password: '',
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps)
    if (this.props.loggedIn){
      this.props.history.push('/chatRoom')
    }
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  loginHandler = () => {
    console.log(this.state.username, this.state.password)
    this.props.login(this.state.username, this.state.password)
  }

  render() {

    return (
      <div className={classes.LoginContainer}>
        <div className={classes.LoginForm}>
          <WindowHeader position="center">Login/SignUp</WindowHeader>
          <form className={classes.Form}>
            <TextInput
              type="text"
              placeholder="username"
              name="username"
              changeHandler={this.changeHandler} />

            <TextInput
              type="password"
              placeholder="password"
              name="password"
              changeHandler={this.changeHandler} />
          </form>
          <Button clicked={this.loginHandler}>Log In</Button>
        </div>
      </div>
    )
  };
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loginReducer.loggedIn,
    hoodOpts: state.chatReducer.hoodOpts,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(actionCreators.userLogin(username, password))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
