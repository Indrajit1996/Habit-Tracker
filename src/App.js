import React, { Component } from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import Homepage from './components/Homepage'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route  exact strict path='/' component={Homepage} />
      </BrowserRouter>
    );

  }
}

export default App;