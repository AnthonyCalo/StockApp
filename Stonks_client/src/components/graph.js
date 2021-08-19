import React from 'react';
import { Line } from 'react-chartjs-2';
import './graph.css';


const LineGraph = (props) =>{
//arrays of graph data _____________________________________________________________________________________________________________
    //30 day graphs________________
    var dates = [];
    var closes = [];
    var high = [];
    var lows= [];
    //100 day graphs______
    var longDates = [];
    var longCloses = [];
    var longHighs = [];
    var longLows= [];

//pushing data into graph arrays from props________________________________________________________________________________________________
    props.graphData.forEach(dataPoint=>{
        closes.push(dataPoint.close);
        dates.push(dataPoint.date.slice(0,10));
        high.push(dataPoint.high);
        lows.push(dataPoint.low);
    })
    props.longData.forEach(dataPoint=>{
        longDates.push(dataPoint.Date);
        longCloses.push(dataPoint.Data["4. close"]);
        longHighs.push(dataPoint.Data["2. high"])
        longLows.push(dataPoint.Data["3. low"])
    })
    var optionsMonth = {
        legend:{
            position: "bottom",
            display: true
        }
    }
    var dataLong = {
        labels: longDates.reverse(),
        datasets: [{
            label: 'Close',
            data: longCloses.reverse(),
            borderColor: "0000000",
            backgroundColor: "#000000",
            pointBackgroundColor: "#00000"

        },
        {
            label: "Highs",
            data: longHighs.reverse(),
            borderColor: "#00FF00",
            backgroundColor: "#00FF00",
            pointBackgroundColor: "#00000"

        },
        {
            label: "Lows",
            data: longLows.reverse(),
            borderColor: '#FF0000',
            backgroundColor: "#FF0000",
            pointBackgroundColor: "#FF0000"

        }]
    }
    var dataMonth = {
        labels: dates.reverse(),
        datasets: [{
            label: 'Close',
            data: closes.reverse(),
            borderColor: "0000000",
            backgroundColor: "#000000",
            pointBackgroundColor: "#00000"

        },
        {
            label: "Highs",
            data: high.reverse(),
            borderColor: "#00FF00",
            backgroundColor: "#00FF00",
            pointBackgroundColor: "#00000"

        },
        {
            label: "Lows",
            data: lows.reverse(),
            borderColor: '#FF0000',
            backgroundColor: "#FF0000",
            pointBackgroundColor: "#FF0000"

        }]
    }
    const renderChart=()=>{
        if(props.graphTime==="30d"){
            return(
            <Line 
                data={dataMonth}
                height={600}
                width={800}
                options={optionsMonth}
            />
            )
        }else{
            return(
            <Line
                data={dataLong}
                height={600}
                width={800}
                options={optionsMonth}
            />
            )
        }
    }
    return(
        <div class="myChart">
            {renderChart()}
        </div>
        )
}

export default LineGraph;