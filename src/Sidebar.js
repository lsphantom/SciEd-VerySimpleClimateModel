import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


class Sidebar extends Component {
    
render(){
const TempSwitch = withStyles({
switchBase: {},
checked: {},
track: {},
})(Switch);

function valuetext(value) {
    return `${value}`;
  }

        return(
            <div id="sidebar" className="col-sm-4">
                <div className="base-panel">
                <p className="sidebar-title">Temperature Scale:</p>
                <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>&deg;C</Grid>
                    <Grid item>
                    <TempSwitch
                        checked="false"
                        value="checkedA"
                    />
                    </Grid>
                    <Grid item>&deg;F</Grid>
                    </Grid>
                </Typography>

                <p className="sidebar-title">Carbon Dioxide Emissions:</p>
                <Typography component="div">
                <Slider
                    defaultValue={10.5}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-small-steps"
                    step={0.2}
                    marks
                    min={0}
                    max={30}
                    valueLabelDisplay="on"
                    track="inverted"
                />
                Gigatons Carbon per Year
                </Typography>


                <p className="sidebar-title">Choose the graphs you want to see:</p>
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
            </div>
        )
    }

}

export default Sidebar;