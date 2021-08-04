import React from 'react';
import marketStack from '../apis/marketStack';
import LineGraph from './graph';


const StockDetail=({stock, details})=>{
    console.log(stock);
    if(details.stock_exchange){
    return(
        <div className="ui segment stock_detail_card">
            <h1>{details.name}</h1>
            <p>{details.symbol}</p>
            <LineGraph />
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
                    <div className="content">Low: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">{stock.high}</div>
                    <div className="content">High: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">{stock.volume}</div>
                    <div className="content">Volume: </div>
                </div>
                <div className="item">
                    <div className="ui right floated content">{details.stock_exchange.name}</div>
                    <div className="content">Exchange: </div>
                </div>

            </div>
        </div>
        )}
        else{
            return <div>Select a stock</div>
        }
}

export default StockDetail;





