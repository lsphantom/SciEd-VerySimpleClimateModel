import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class GraphArea extends Component {
   
    componentDidMount(){
            am4core.useTheme(am4themes_animated);
          
            // Create chart instance
            var chart = am4core.create("chartdiv", am4charts.XYChart);
            
            // Initial data
            chart.data = this.props.data;
            
            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.dateFormats.setKey("yyyy");
            
            
            // Create series
            function createSeriesAndAxis(field, name, topMargin, bottomMargin, bulletOutline, bulletFill, bulletType) {
              var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
              
              var series = chart.series.push(new am4charts.LineSeries());
              series.dataFields.valueY = field;
              series.dataFields.dateX = "year";
              series.name = name;
              series.tooltipText = "{dateX}: [b]{valueY}[/]";
              series.strokeWidth = 2;
              series.yAxis = valueAxis;
              series.stroke = bulletOutline;
              
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

            }
            
            createSeriesAndAxis("co2Emissions", "Carbon Emissions", false, true, "#007bff", "#fff", "triangle");
            createSeriesAndAxis("co2Concentration", "CO2 Concentration", true, true, "#444", "#000", "circle");
            createSeriesAndAxis("temp", "Temperature", true, false, "#6a124f", "#ff0000", "square");
            
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