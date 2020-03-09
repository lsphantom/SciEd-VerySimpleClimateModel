import React, {Component} from 'react';
import './App.css';
import sciedLogo from './scied-logo.png';

import Sidebar from './Sidebar';
import GraphArea from './GraphArea';

class App extends Component {
  //Initial State (HISTORIC DATA)
  state = {
    tempScale: 'C',
    emissionRate: 10.5,
    data : [{
     "year": new Date(1960, 0, 1),
     "co2Emissions": 4.14,
     "co2Concentration": 316.91,
     "temp": 13.977
   }, {
     "year": new Date(1965, 0, 1),
     "co2Emissions": 4.68,
     "co2Concentration": 320.04,
     "temp": 13.886
   }, {
     "year": new Date(1970, 0, 1),
     "co2Emissions": 5.59,
     "co2Concentration": 325.68,
     "temp": 13.922
   }, {
     "year": new Date(1975, 0, 1),
     "co2Emissions": 5.86,
     "co2Concentration": 331.08,
     "temp": 13.920
   }, {
     "year": new Date(1980, 0, 1),
     "co2Emissions": 6.53,
     "co2Concentration": 338.68,
     "temp": 14.053
   }, {
     "year": new Date(1985, 0, 1),
     "co2Emissions": 6.68,
     "co2Concentration": 346.04,
     "temp": 14.081
   }, {
     "year": new Date(1990, 0, 1),
     "co2Emissions": 7.34,
     "co2Concentration": 354.35,
     "temp": 14.191
   }, {
     "year": new Date(1995, 0, 1),
     "co2Emissions": 7.79,
     "co2Concentration": 360.80,
     "temp": 14.239
   }, {
     "year": new Date(2000, 0, 1),
     "co2Emissions": 7.79,
     "co2Concentration": 369.52,
     "temp": 14.401
   }, {
     "year": new Date(2005, 0, 1),
     "co2Emissions": 8.93,
     "co2Concentration": 379.80,
     "temp": 14.471
   }, {
     "year": new Date(2010, 0, 1),
     "co2Emissions": 9.84,
     "co2Concentration": 389.85,
     "temp": 14.451
   }]
  }


  //Switch between Celsius or Farenheit
  changeTempScale () {

  }

  celsiusToFarenheit (value) {
    return (value * 9/5) + 32;
  }
  farenheitToCelsius (value) {
    return (value - 32) * 5/9;
  }

  changeAllTempValues () {
    let oldTemps = this.state.data;
    console.log(oldTemps);
  }

  addDataPoint () {

  }

  render () {
    return (
    <div className="App">
      <div id="vscm" className="container">
          <div className="titles">
            <h2>Very Simple Climate Model</h2>
            <h1>How much will our world warm?</h1>
          </div>

          <div className="row">
            <Sidebar settings={this.state} />
            <GraphArea data={this.state.data} />
          </div>

          <div className="footer">
            <img className="logo" src={sciedLogo} alt="UCAR - SciEd" />
          </div>
      </div>
    </div>
  )
  }
}

export default App;
