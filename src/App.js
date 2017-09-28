import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Search from './search/Search';
import './App.css';

export default () => (
  <MuiThemeProvider>
    <Router>
      <Route path="/:username" component={Search} />
    </Router>
  </MuiThemeProvider>
);
