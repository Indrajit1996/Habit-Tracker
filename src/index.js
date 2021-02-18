import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-dates/initialize';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import TaskApp from './store/reducers/index';
import {loadState, saveState} from './localStorage';

import * as serviceWorker from './serviceWorker';



const persistedState = loadState();
const store = createStore(TaskApp, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(() => {
  saveState({ 
    tasks: store.getState().tasks,
  })
})

ReactDOM.render(
    <Provider store={store}> 
      <App/>
    </Provider>,
     document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();