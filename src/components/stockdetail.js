import React from 'react';
import marketStack from '../apis/marketStack';
import LineGraph from './graph';


const StockDetail=({stock, details, graphData})=>{
    
    console.log(details);
    return(
        <div className="ui segment stock_detail_card">
            <h1>{details.Name}</h1>
            <p>{details.Symbol}</p>
            <LineGraph graphData={graphData}/>
            <div className="ui middle aligned divided list">
                <div className="item">
                    <div className="ui right floated content">{stock.last}</div>
                    <div className="content">LastPrice: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">{stock.open}</div>
                    <div className="content">Open: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">{stock.low}</div>
                    <div className="content">Daily Low: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">{stock.high}</div>
                    <div className="content">Daily High: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">{stock.volume}</div>
                    <div className="content">Volume: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">{details["52WeekHigh"]}</div>
                    <div className="content">52 Week High: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">{details["PERatio"]}</div>
                    <div className="content">PE ratio: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">{details["DividendYield"]}</div>
                    <div className="content">Dividend Yield: </div>
                </div>

            </div>
        </div>
        )
        
}

export default StockDetail;





