import React from 'react';


const StockItem=(props)=>{
    return(
        <div className="list-group-item stockItem" key={props.stockData.symbol}>
            <div className='stockItem'  onClick={()=>props.onStockSelect(props.stockData)} >
                <h2>{props.stockData.symbol}</h2>
            
            </div>
            <div className="right floated">
                <p>{props.stockData.last}</p>
                <div className="iconic" onClick={()=>props.removeStock(props.stockData.symbol)}>
                    <i className="close icon"></i>
                </div>
                </div>
        </div>
        )
}

export default StockItem;
