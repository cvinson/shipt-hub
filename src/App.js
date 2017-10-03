import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ProfileContainer from './profile/ProfileContainer';
import './App.css';

export default () => (
  <MuiThemeProvider>
    <Router>
      <div className="main">
        <img className="logo" src="/shipt-hub-logo.png" alt="ShiptHub"/>
        <Route path="/:username" component={ProfileContainer} />
      </div>
    </Router>
  </MuiThemeProvider>
);
