import React, {useState} from 'react';
import { Line } from 'react-chartjs-2';



const LineGraph = ({graphData}) =>{
    console.log("Graph:");
    var closes = [];
    var dates = [];
    graphData.forEach(dataPoint=>{
        closes.push(dataPoint.close);
        dates.push(dataPoint.date.slice(0,10));
    })
    console.log(closes);
    console.log(dates);
    var data = {
        labels: dates.reverse(),
        datasets: [{
            label: 'Close',
            data: closes.reverse()
        }]
    }
    return(
        <div>
            <Line 
                data={data}
                height={400}
                width={600}
            />
        </div>
        )
}

export default LineGraph;