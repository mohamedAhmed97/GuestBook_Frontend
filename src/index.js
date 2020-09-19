import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px', 
  // you can also just use 'scale'
  transition: transitions.SCALE
}
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
