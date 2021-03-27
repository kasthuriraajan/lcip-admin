import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faCoffee, faDesktop, faUser, faUsers, faKey, faLock, faLayerGroup, faCircle, faCog,
   faUniversity, faCloud, faExternalLinkAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckSquare, faCoffee, faDesktop, faUser, faUsers, faLock, faKey, faLayerGroup, faCircle, faCog, 
  faUniversity, faCloud, faExternalLinkAlt, faEnvelope)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
