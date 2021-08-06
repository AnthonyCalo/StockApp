import React, {useState} from 'react';
import { Line } from 'react-chartjs-2';
import './graph.css';


const LineGraph = ({graphData}) =>{
    console.log("Graph:");
    var closes = [];
    var dates = [];
    var high = [];
    var lows= [];
    graphData.forEach(dataPoint=>{
        closes.push(dataPoint.close);
        dates.push(dataPoint.date.slice(0,10));
        high.push(dataPoint.high);
        lows.push(dataPoint.low);
    })
    console.log(closes);
    console.log(dates);
    var options = {
        legend:{
            position: "bottom",
            display: true
        }
    }
     
    var data = {
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
    return(
        <div class="myChart">
            <Line 
                data={data}
                height={600}
                width={800}
                options={options}
            />
        </div>
        )
}

export default LineGraph;