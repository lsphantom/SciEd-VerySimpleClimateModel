import React, {Component} from 'react';

class DataTable extends Component {


render() {
    const {data} = this.props;

    return (
        <div className="base-panel data-table">
            <h3>Data Table</h3>
            <table className="table">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>CO2 Conc.</th>
                    <th>CO2 Emiss.</th>
                    <th>Temp &deg;C</th>
                    <th>Temp &deg;F</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, i) => (
                   <tr key={i}>
                       <td>{(item.year).getFullYear()}</td>
                       <td>{parseFloat(item.co2Concentration).toFixed(3)}</td>
                       <td>{item.co2Emissions}</td>
                       <td>{parseFloat(item.tempC).toFixed(3)}</td>
                       <td>{parseFloat(item.tempF).toFixed(3)}</td>
                   </tr>)
                )}
            </tbody>
            
            </table>
        </div>
    );
}


}

export default DataTable;