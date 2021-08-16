import React, {useState} from 'react';
import LineGraph from './graph';
import Accordion from './Accordion';


const StockDetail=({stock, details, graphData, longData})=>{
    const [graphTime, setGraphTime] = useState('30d');
    const items=
        [
            {
                title: "See company details",
                content: details.Description
            }
        ]
    const handleGTime=(event)=>{
        if(event.target.innerHTML==="100d"){
            document.getElementById("trenta").classList.remove("selectedGraph");
            document.getElementById('cento').classList.add("selectedGraph");
            setGraphTime('100d');
        }else{
            document.getElementById("cento").classList.remove("selectedGraph");
            document.getElementById('trenta').classList.add("selectedGraph");
            setGraphTime('30d')
        }
    }
    return(
        <div className="ui segment stock_detail_card">
            <h1>{details.Name}</h1>
            <p>{details.Symbol}</p>
            <div className="graphTime">
                <button id="trenta" className="thirtyButton timeBtn selectedGraph" onClick={(e)=>handleGTime(e)}>30d</button>
                <button id="cento" className="centoButton timeBtn" onClick={(e)=>handleGTime(e)}>100d</button>
            </div>
            <LineGraph graphData={graphData} longData={longData} graphTime={graphTime}/>

            <div className="ui middle aligned divided list stock_info">
                <div className="item">
                    <div className="ui right floated content">${stock.last}</div>
                    <div className="content">LastPrice: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">${stock.open}</div>
                    <div className="content">Open: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">${stock.low}</div>
                    <div className="content">Daily Low: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">${stock.high}</div>
                    <div className="content">Daily High: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">{stock.volume}</div>
                    <div className="content">Volume: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">${details["52WeekHigh"]}</div>
                    <div className="content">52 Week High: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">${details["52WeekLow"]}</div>
                    <div className="content">52 Week Low: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">{details["EPS"]}</div>
                    <div className="content">EPS: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">{details["PERatio"]}</div>
                    <div className="content">PE ratio: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">{details["DividendYield"]}</div>
                    <div className="content">Dividend Yield: </div>
                </div>
                <div className="item">
                   <Accordion items={ items } />
                </div>

            </div>
        </div>
        )
        
}

export default StockDetail;





