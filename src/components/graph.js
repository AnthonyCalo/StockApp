import React from 'react';
import { Line } from 'react-chartjs-2';



const LineGraph = () =>{
    return(
        <div>
            <Line 
                height={400}
                width={600}
            />
        </div>
        )
}

export default LineGraph;