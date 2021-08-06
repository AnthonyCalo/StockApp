import React from 'react';


const StockItem=(props)=>{
    return(
        <div className="list-group-item stockItem" key={props.stockData.symbol} onClick={()=>props.onStockSelect(props.stockData)}>
            <div className='stockItem' >
                <h2>{props.stockData.symbol}</h2>
                <div className="right floated">
                <p>{props.stockData.last}</p>
                <i className="close icon"></i>
                </div>
            </div>
            

        </div>
        )
}

export default StockItem;
