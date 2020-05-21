import React, {Component} from 'react';
import DataTable from './DataTable';

import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import RotateLeft from '@material-ui/icons/RotateLeft';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
//import am4themes_animated from "@amcharts/amcharts4/themes/animated";


const TempSwitch = withStyles({
    switchBase: {
        color: '#138785',
            '&$checked': { color: '#27baaf'},
            '&$checked + $track': { backgroundColor: '#138785'}
    },
    checked: {},
    track: {},
    })(Switch);

class Interactive extends Component {

  //Initial State (HISTORIC DATA)
  state = {
    ready: true,
    running: false,
    tempScaleCelsius: true,
    emissionRate: 10.5,
    climateSensitivity: 3,
    displayEmissions: true,
    displayCO2: true,
    displayTemperature: true,
    displayDataTable: true,
    data : [{
     "year": new Date(1960, 0),
     "co2Emissions": 4.14,
     "co2Concentration": 316.91,
     "tempC": 13.977,
     "tempF": 57.159
   }, {
     "year": new Date(1965, 0),
     "co2Emissions": 4.68,
     "co2Concentration": 320.04,
     "tempC": 13.886,
     "tempF": 56.995
   }, {
     "year": new Date(1970, 0),
     "co2Emissions": 5.59,
     "co2Concentration": 325.68,
     "tempC": 13.922,
     "tempF": 57.060
   }, {
     "year": new Date(1975, 0),
     "co2Emissions": 5.86,
     "co2Concentration": 331.08,
     "tempC": 13.920,
     "tempF": 57.056
   }, {
     "year": new Date(1980, 0),
     "co2Emissions": 6.53,
     "co2Concentration": 338.68,
     "tempC": 14.053,
     "tempF": 57.295
   }, {
     "year": new Date(1985, 0),
     "co2Emissions": 6.68,
     "co2Concentration": 346.04,
     "tempC": 14.081,
     "tempF": 57.346
   }, {
     "year": new Date(1990, 0),
     "co2Emissions": 7.34,
     "co2Concentration": 354.35,
     "tempC": 14.191,
     "tempF": 57.544
   }, {
     "year": new Date(1995, 0),
     "co2Emissions": 7.79,
     "co2Concentration": 360.80,
     "tempC": 14.239,
     "tempF": 57.630
   }, {
     "year": new Date(2000, 0),
     "co2Emissions": 7.79,
     "co2Concentration": 369.52,
     "tempC": 14.401,
     "tempF": 57.922
   }, {
     "year": new Date(2005, 0),
     "co2Emissions": 8.93,
     "co2Concentration": 379.80,
     "tempC": 14.471,
     "tempF": 58.048
   }, {
     "year": new Date(2010, 0),
     "co2Emissions": 9.84,
     "co2Concentration": 389.85,
     "tempC": 14.451,
     "tempF": 58.012
   }]
  }

//**** SIDEBAR HANDLES */
//Change Temperature Scale
handleTSChange = event => {
    this.setState({tempScaleCelsius: !this.state.tempScaleCelsius});
    this.chart.series.removeIndex(2);
    
    this.triggeredComponentUpdate();
}
//Change Emission Rate
handleERChange = (event, newValue) => {
    this.setState({emissionRate: newValue});
}
//Choose Graphs to Display
handleGraphsToDisplay = (event) => {
  this.setState({[event.target.value]: event.target.checked})
}
//Change Climate Sensitivity
handleCSChange = event => {
  this.setState({climateSensitivity: event.target.value});
};
//Return string value for emissions rate slider
valuetext(value) {
    return `${value}`;
}
//Change Play/Pause Buttons
handlePlay = event => {
  this.setState({running: true});
  this.playInteraction();
}
handlePause = event => {
  this.setState({running: false});
}

//**** TEMP SCALE CONVERSIONS */
  changeTempScale () {}
  // C to F
  celsiusToFarenheit (value) {
    return (value * 9/5) + 32;
  }
  // F to C
  farenheitToCelsius (value) {
    return (value - 32) * 5/9;
  }


/**** ADD NEW DATA */
  addSingleDataPoint () {
    console.log('Add single data point start');
    const currentData = this.state.data;
    const currentEmissionRate = this.state.emissionRate;
    const currentClimateSensitivity = this.state.climateSensitivity;
    const currentDataSize = currentData.length;
    const baselineDate = currentData[currentDataSize -1].year;
    const baselineYear = baselineDate.getFullYear();
    const baselineTemp = currentData[currentDataSize -1].tempC;
    const baselineCO2Concentration = currentData[currentDataSize - 1].co2Concentration;


    let currentDateSet =  new Date(baselineYear + 5, 0); //5yr interavals set
    let currentYearSet = currentDateSet.getFullYear();
    const atmosphericFraction = 0.45; //45% standard
    //const co2RemovalRate = 0.001; //0.1% per year
    let GtC_per_ppmv = 2.3; // GtC (approx. 2.3 GtC per 1 ppmv)
    let atomosphereCO2Increase = (1 - atmosphericFraction) * currentEmissionRate;

    let calculatedCO2Concentration = baselineCO2Concentration + (atomosphereCO2Increase / GtC_per_ppmv);
    let calculatedTemp = baselineTemp + currentClimateSensitivity * Math.log2 (calculatedCO2Concentration / baselineCO2Concentration);
    let calculatedTempF = this.celsiusToFarenheit(calculatedTemp);

    //console.log(14.471 + currentClimateSensitivity * Math.log2());

    let newDataPoint = {
        "year": currentDateSet,
        "co2Emissions": currentEmissionRate,
        "co2Concentration": calculatedCO2Concentration,
        "tempC": calculatedTemp,
        "tempF": calculatedTempF
    }

    
    //Max date 2100
    if (currentYearSet <= 2100) {
      this.setState({
        data: [...this.state.data, newDataPoint]
      });
    }
    else {
      this.setState({
        ready: false,
        running: false,
      })
    }


    //Write to visualization
    this.triggeredComponentUpdate();
  }


  resetVisuals(){
    //delete data and return to first 50 years (10 data points)
    let finalData = this.state.data;
        finalData.length = 11;
    //return only historic points and restore buttons
    this.setState({
      data: finalData,
      ready: true,
    });
    //init graph again
    this.triggeredComponentUpdate();
  }


  /*stepForwardInteraction() {
    this.addSingleDataPoint();
  }*/

  playInteraction() {
    this.addSingleDataPoint();
    setTimeout(() => this.playInteraction(), 1000);
  }


addSeries() {

}

  

  componentDidMount(){
    //am4core.useTheme(am4themes_animated);
  
    // Create chart instance
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    
    // Initial data
    chart.data = this.state.data;
    
    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.dateFormats.setKey("yyyy");
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.labels.template.fontSize = 12;
    //categoryAxis.renderer.labels.template.rotation = -45;
    categoryAxis.fillRule = function(dataItem) {
      var date = new Date(dataItem.value);
      if (date.getFullYear() >= 1960 || date.getFullYear() <= 2010) {
        dataItem.axisFill.visible = true;
      }
      else {
        dataItem.axisFill.visible = false;
      }
    }
    
    

    // Create series
    function createSeriesAndAxis(field, name, topMargin, bottomMargin, bulletOutline, bulletFill, bulletType) {
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "year";
      series.name = name;
      series.tooltipText = "[bold]{name}:[/] {valueY.formatNumber('###.00')}" ;
      series.strokeWidth = 2;
      series.yAxis = valueAxis;
      series.stroke = bulletOutline;
      series.fill = bulletFill;
      
      valueAxis.renderer.line.strokeOpacity = 1;
      valueAxis.renderer.line.stroke = series.stroke;
      valueAxis.renderer.grid.template.stroke = series.stroke;
      valueAxis.renderer.grid.template.strokeOpacity = 0.1;
      valueAxis.renderer.labels.template.fill = series.stroke;
      valueAxis.renderer.minGridDistance = 50;
      valueAxis.renderer.labels.template.fontSize = 12;
      valueAxis.align = "right";
      //valueAxis.min = 0;
      
      if (topMargin && bottomMargin) {
        valueAxis.marginTop = 10;
        valueAxis.marginBottom = 10;
      }
      else {
        if (topMargin) {
          valueAxis.marginTop = 20;
        }
        if (bottomMargin) {
          valueAxis.marginBottom = 20;
        }
      }

      switch (bulletType) {
        case "circle":
          var bullet = series.bullets.push(new am4charts.CircleBullet());
          bullet.circle.stroke = am4core.color(bulletOutline);
          bullet.circle.fill = bulletFill;
          bullet.circle.strokeWidth = 2;
        break;

        case "square":
          var bullet2 = series.bullets.push(new am4charts.Bullet());
          let square = bullet2.createChild(am4core.Rectangle);
          square.width = 8;
          square.height = 8;
          square.horizontalCenter = "middle";
          square.verticalCenter = "middle";
          square.stroke = bulletOutline;
          square.fill = bulletFill;
          square.strokeWidth = 2;
        break;

        case "triangle":
          var bullet3 = series.bullets.push(new am4charts.Bullet());
          let arrow = bullet3.createChild(am4core.Triangle);
          arrow.width = 10;
          arrow.height = 10;
          arrow.horizontalCenter = "middle";
          arrow.verticalCenter = "middle";
          arrow.stroke = bulletOutline;
          arrow.fill = bulletFill;
          arrow.strokeWidth = 2;
        break;

        default:
        break;
      }


      /* Create Warning Limit Guides
      var limitGuide = valueAxis.axisRanges.create();
          limitGuide.value = 14.3;
          limitGuide.grid.stroke = "red"
          limitGuide.grid.strokeOpacity = 0.6;
          limitGuide.label.text = "Recommended Temperature Limit";
          limitGuide.label.align = "right";
          limitGuide.label.verticalCenter = "top";
          limitGuide.label.horizontalCenter = "middle";
          limitGuide.label.fill = "red";
          limitGuide.label.fillOpacity = 0.8;
          limitGuide.label.dx = 140;*/
      
      /*let label = chart.createChild(am4core.Label);
          label.text = "Hello world!";
          label.fontSize = 20;
          label.align = "center";*/
    }
    
    createSeriesAndAxis("co2Emissions", "Carbon Emissions", false, true, "#007bff", "#007bff", "triangle");
    createSeriesAndAxis("co2Concentration", "CO2 Concentration", true, true, "#444", "#000", "circle");

    if (this.state.tempScaleCelsius) {
      createSeriesAndAxis("tempC", "Temperature", true, false, "#6a124f", "#ff0000", "square");
    } else {
      createSeriesAndAxis("tempF", "Temperature", true, false, "#6a124f", "#ff0000", "square");
    }
    

    
    chart.legend = new am4charts.Legend();
    //chart.legend.itemContainers.template.clickable = false;
    //chart.legend.itemContainers.template.focusable = false;
    //chart.legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default;
    chart.cursor = new am4charts.XYCursor();
    chart.leftAxesContainer.layout = "horizontal";  


    this.chart = chart;
}

triggeredComponentUpdate() {
  this.chart.data = this.state.data;
}

/*componentDidUpdate(oldProps) {
  this.chart.data = this.state.data;
}*/


    render() {


      return (
        <div className="row">
            <div id="sidebar" className="col-sm-4">
                <div className="base-panel">
                <p className="hook-text"><em>What will the temperature be in the future? Make a prediction using this model.</em></p>
                
                <div className="sidebar-block">
                <p className="sidebar-title">Temperature scale:</p>
                <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>&deg;F</Grid>
                    <Grid item>
                    <TempSwitch
                        checked={this.state.tempScaleCelsius}
                        value="tempScaleCelsius"
                        onChange={this.handleTSChange}
                    />
                    </Grid>
                    <Grid item>&deg;C</Grid>
                    </Grid>
                </Typography>
                </div>


                <div className="sidebar-block">
                <p className="sidebar-title">Select an emissions rate:</p>
                <Typography component="div">
                <Slider
                    defaultValue={10.5}
                    //value={this.state.emissionRate}
                    //getAriaValueText={this.valuetext}
                    //aria-labelledby="discrete-slider-small-steps"
                    step={0.2}
                    marks
                    min={0}
                    max={30}
                    valueLabelDisplay="on"
                    track="inverted"
                    onChange={this.handleERChange}
                />
                Gigatons Carbon per Year
                </Typography>
                </div>

                <div className="sidebar-block">
                <p className="sidebar-title">Choose the graphs <br/>you want to see:</p>
                <FormControlLabel
                    value="displayEmissions"
                    control={<Checkbox color="primary" checked={this.state.displayEmissions} onChange={this.handleGraphsToDisplay} />}
                    label="CO2 Emission Rate"
                />
                <FormControlLabel
                    value="displayCO2"
                    control={<Checkbox color="primary" checked={this.state.displayCO2} onChange={this.handleGraphsToDisplay} />}
                    label="CO2 Concentration"
                    onChange={this.handleGraphsToDisplay}
                />
                <FormControlLabel
                    value="displayTemperature"
                    control={<Checkbox color="primary" checked={this.state.displayTemperature} onChange={this.handleGraphsToDisplay} />}
                    label="Temperature"
                    onChange={this.handleGraphsToDisplay}
                />
                </div>
                

                <div className="sidebar-block">
                <p className="sidebar-title">Change climate sensitivity:</p>
                <FormControl>
                    <Select
                    labelId="cs-selector"
                    id="cs-selector"
                    value={this.state.climateSensitivity}
                    onChange={this.handleCSChange}
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

                { this.state.ready
                ?
                <div className="sidebar-buttons">
                  <Button className="skip-button" onClick={() => this.addSingleDataPoint()} variant="contained" color="primary" title="Step Forward">
                      <SkipNextIcon />
                  </Button>

                  { this.state.running
                    ?
                  <Button className="pause-button" onClick={(event) => this.handlePause(event)} variant="contained" color="primary" title="Pause">
                    <PauseIcon />
                  </Button>
                    :
                  <Button className="play-button" onClick={(event) => this.handlePlay(event)} variant="contained" color="primary" title="Go">
                      <PlayArrowIcon />
                  </Button>
                  }
  
                  <Button className="reset-button" onClick={(event) => this.resetVisuals(event)} variant="contained" color="primary" title="Start Over">
                      <RotateLeft />
                  </Button>
                </div>
                :
                <div className="sidebar-buttons">
                  <Button className="reset-button" onClick={(event) => this.resetVisuals(event)} variant="contained" color="primary" title="Start Over">
                    <RotateLeft /> Start Over
                  </Button>
                </div>
                }
                <br/>
                <p className="sidebar-title">Show data table:</p>
                <FormControlLabel
                    value="displayDataTable"
                    control={<Checkbox color="primary" checked={this.state.displayDataTable} onChange={this.handleGraphsToDisplay} />}
                    label="Data Table"
                    onChange={this.handleGraphsToDisplay}
                />
                </div>
            </div>
            {/*<GraphArea data={this.state.data} />*/}
            <div id="graph-area" className="col-sm-8">
                <div className="base-panel">
                    <div id="chartdiv"></div>
                </div>
            </div>

            <div className="data-wrap col-sm-12">
              {this.state.displayDataTable
                ? <DataTable data={this.state.data} />
                : null
              }
            </div>
          </div>
      );
    }
  }

export default Interactive;