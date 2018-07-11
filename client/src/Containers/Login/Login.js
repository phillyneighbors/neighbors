import React, { Component } from 'react';
import classes from './Login.css';
// import MapContainer from '../Components/Map/Map'
import Button from '../../Components/UI/Button/Button';
import WindowHeader from '../../Components/UI/WindowHeader/WindowHeader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextInput from '../../Components/UI/TextInput/TextInput';
import Modal from '../../Components/UI/Modal/Modal';
import * as loginActions from '../../store/actions/loginActions';
import * as chatActions from '../../store/actions/chatActions';


class Login extends Component {

  state = {
    username: '',
    password: '',
    modal: false,
    userInteracted: false
  }

  componentDidUpdate() {
    if (this.props.hoodOpts.length > 1 && !this.state.modal && !this.state.userInteracted) {
      this.setState({
        modal: true,
      })
    }
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

  closeModal = () => {
    console.log('closing modal')
    this.setState({
      modal: false,
      userInteracted: true,
    })
  }

  selectHood = event => {
    console.log(event.target)
    this.props.getHoodData(event.target.innerHTML)
    this.closeModal();
  }


  render() {
    console.log("STATE: ", this.state.modal)
      // turn the hood options into buttons
      const buttons = this.props.hoodOpts.map(hood => {
        return <div className={classes.Center} style={{width: 100/this.props.hoodOpts.length + "%"}}><Button clicked={this.selectHood}>{hood}</Button></div>

      })
      const modal = <Modal show={this.state.modal} closeModal={this.closeModal}>
        You are near {this.props.hoodOpts.length} neighborhoods. Select the one you would
        like to join
        <div className={classes.FlexRow}>{buttons}</div>
      </Modal>
    return (
      <div className={classes.LoginContainer}>
        {this.state.modal ? modal : null}
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
    login: (username, password) => dispatch(loginActions.userLogin(username, password)),
    getHoodData: name => dispatch(chatActions.getHoodData(name))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
