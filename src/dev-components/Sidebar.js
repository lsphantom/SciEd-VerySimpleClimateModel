import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';





class Sidebar extends Component {
  state = { 
      tempScale: false,
      emissionRate: 10.5,
      climateSensitivity: 3
  }
  
render(){

const TempSwitch = withStyles({
switchBase: {
    color: '#138785',
        '&$checked': { color: '#27baaf'},
        '&$checked + $track': { backgroundColor: '#138785'}
},
checked: {},
track: {},
})(Switch);

const handleTSChange = event => {
    this.setState({tempScale: !this.state.tempScale});
}

const handleERChange = (event, newValue) => {
    this.setState({emissionRate: newValue});
}

const handleCSChange = event => {
    this.setState({climateSensitivity: event.target.value});
};

function valuetext(value) {
    return `${value}`;
}


        return(
            <div id="sidebar" className="col-sm-4">
                <div className="base-panel">
                <p className="hook-text"><em>What will the temperature be in the future? Make a prediction using this model.</em></p>
                
                <div className="sidebar-block">
                <p className="sidebar-title">Temperature scale:</p>
                <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>&deg;C</Grid>
                    <Grid item>
                    <TempSwitch
                        checked={this.state.tempScale} //false = C, true = F
                        value="tempScale"
                        onChange={handleTSChange}
                    />
                    </Grid>
                    <Grid item>&deg;F</Grid>
                    </Grid>
                </Typography>
                </div>


                <div className="sidebar-block">
                <p className="sidebar-title">Select an emissions rate:</p>
                <Typography component="div">
                <Slider
                    defaultValue={10.5}
                    value={this.state.emissionRate}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-small-steps"
                    step={0.2}
                    marks
                    min={0}
                    max={30}
                    valueLabelDisplay="on"
                    track="inverted"
                    onChange={handleERChange}
                />
                Gigatons Carbon per Year
                </Typography>
                </div>

                <div className="sidebar-block">
                <p className="sidebar-title">Choose the graphs <br/>you want to see:</p>
                <FormControlLabel
                    value="co2 emission rate"
                    control={<Checkbox color="primary" />}
                    label="CO2 Emission Rate"
                />
                <FormControlLabel
                    value="co2 concentration"
                    control={<Checkbox color="primary" />}
                    label="CO2 Concentration"
                />
                <FormControlLabel
                    value="temperature"
                    control={<Checkbox color="primary" />}
                    label="Temperature"
                />
                </div>
                

                <div className="sidebar-block">
                <p className="sidebar-title">Change climate sensitivity:</p>
                <FormControl>
                    <Select
                    labelId="cs-selector"
                    id="cs-selector"
                    value={this.state.climateSensitivity}
                    onChange={handleCSChange}
                    >
                    <MenuItem value={2}>2 degrees Celsius</MenuItem>
                    <MenuItem value={2.5}>2.5 degrees Celsius</MenuItem>
                    <MenuItem value={3}>3 degrees Celsius</MenuItem>
                    <MenuItem value={4}>4 degrees Celsius</MenuItem>
                    <MenuItem value={4.5}>4.5 degrees Celsius</MenuItem>
                    <MenuItem value={5}>5 degrees Celsius</MenuItem>
                    </Select>
                </FormControl>
                </div>

                <div className="sidebar-buttons">
                <Button className="skip-button" variant="contained" color="primary" title="Step Forward">
                    <SkipNextIcon />
                </Button>

                <Button className="play-button" variant="contained" color="primary" title="Go">
                    <PlayArrowIcon />
                </Button>
                </div>

                </div>
            </div>
        )
    }

}

export default Sidebar;