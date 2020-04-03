import React, {Component} from 'react';
import sciedLogo from './scied-logo.png';

class Footer extends Component {
    render() {
      return (
        <div className="footer">
            <img className="logo" src={sciedLogo} alt="UCAR - SciEd" />
        </div>
      );
    }
  }

export default Footer;