import React, {useState} from 'react';


const StockItem=(props)=>{
    var priceColor="black";
    
    if(props.stockData.last>props.stockData.open){
        priceColor='green';
    }else if(props.stockData.last< props.stockData.open){
        priceColor='red';
    }
    return(
        <div className="list-group-item stockItem" key={props.stockData.symbol}>
            <div className='stockSymbolPrice'  onClick={()=>props.onStockSelect(props.stockData)} >
                <h2>{props.stockData.symbol}</h2>
                <p style={{"color":`${priceColor}`}}>{props.stockData.last}</p>            
            </div>
            <div className="right floated">
                <div className="iconic" onClick={()=>props.removeStock(props.stockData.symbol)}>
                    <i className="close icon"></i>
                </div>
                </div>
        </div>
        )
}

export default StockItem;
