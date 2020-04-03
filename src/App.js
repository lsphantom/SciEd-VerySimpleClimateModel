import React, {Component} from 'react';
import './App.css';

import Header from './Header';
import Interactive from './Interactive';
import Footer from './Footer';


class App extends Component {

  render () {
    return (
    <div className="App">
      <div id="vscm" className="container">
          <Header/>
          <Interactive/>
          <Footer/>
      </div>
    </div>
  )
  }
}

export default App;
