import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class GraphArea extends Component {

    componentDidMount(){
            am4core.useTheme(am4themes_animated);
          
            // Create chart instance
            var chart = am4core.create("chartdiv", am4charts.XYChart);
            
            // Add data
            chart.data = [{
              "date": new Date(1960, 0, 1),
              "value": 0,
              "value2": 362,
              "value3": 699
            }, {
              "date": new Date(1970, 0, 1),
              "value": 4,
              "value2": 450,
              "value3": 841
            }, {
              "date": new Date(1980, 0, 1),
              "value": 8,
              "value2": 358,
              "value3": 699
            }, {
              "date": new Date(1990, 0, 1),
              "value": 12,
              "value2": 367,
              "value3": 500
            }, {
              "date": new Date(2000, 0, 1),
              "value": 16,
              "value2": 485,
              "value3": 369
            }, {
              "date": new Date(2010, 0, 1),
              "value": 20,
              "value2": 354,
              "value3": 250
            }, {
              "date": new Date(2020, 0, 1),
              "value": 24,
              "value2": 350,
              "value3": 600
            }];
            
            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;
            
            
            // Create series
            function createSeriesAndAxis(field, name, topMargin, bottomMargin) {
              var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
              
              var series = chart.series.push(new am4charts.LineSeries());
              series.dataFields.valueY = field;
              series.dataFields.dateX = "date";
              series.name = name;
              series.tooltipText = "{dateX}: [b]{valueY}[/]";
              series.strokeWidth = 2;
              series.yAxis = valueAxis;
              
              valueAxis.renderer.line.strokeOpacity = 1;
              valueAxis.renderer.line.stroke = series.stroke;
              valueAxis.renderer.grid.template.stroke = series.stroke;
              valueAxis.renderer.grid.template.strokeOpacity = 0.1;
              valueAxis.renderer.labels.template.fill = series.stroke;
              valueAxis.renderer.minGridDistance = 20;
              valueAxis.align = "right";
              
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
              
              var bullet = series.bullets.push(new am4charts.CircleBullet());
              bullet.circle.stroke = am4core.color("#fff");
              bullet.circle.strokeWidth = 2;
            }
            
            createSeriesAndAxis("value", "Series #1", false, true);
            createSeriesAndAxis("value2", "Series #2", true, true);
            createSeriesAndAxis("value3", "Series #3", true, false);
            
            chart.legend = new am4charts.Legend();
            chart.cursor = new am4charts.XYCursor();
            
            chart.leftAxesContainer.layout = "horizontal";
          
    }

    render(){
        return (
            <div id="graph-area" className="col-sm-8">
                <div className="base-panel">
                    <div id="chartdiv"></div>
                </div>
            </div>
        )
    }

}

export default GraphArea;