import React from 'react';
import './App.css';

import Sidebar from './Sidebar';
import GraphArea from './GraphArea';

function App() {
  return (
    <div className="App">
      <div id="vscm" className="container">
          <div className="titles">
            <h1>How much will our world warm?</h1>
            <h2>Use this model to make a prediction.</h2>
          </div>

          <div className="row">
            <Sidebar />
            <GraphArea />
          </div>

          <div className="footer"></div>
      </div>
    </div>
  );
}

export default App;
