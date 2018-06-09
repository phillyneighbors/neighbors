import React from 'react';
import Layout from './Containers/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import loginReducer from './store/reducers/loginReducer';
import chatReducer from './store/reducers/chatReducer';


const rootReducer = combineReducers({
    loginReducer,
    chatReducer,
});

const logger = store => {
  return next => {
    return action => {
      const result = next(action);
      return result;
    }
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

const App = (props) => (
  <Provider store={store}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Provider>
);

export default App;
