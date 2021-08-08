import React, {useEffect, useState} from 'react';
import StockItem from './stockitem';

const StockList = (props)=>{
    const [items, setItems] = useState([]);

    const itemsToRender= props.Stonks.map(item =>{
        return(
            <StockItem stockData={item} onStockSelect={props.onStockSelect} removeStock={props.removeStock}/>
        )
    })
   return(
        <div className="list-group">
            <h1><center>Stock List</center></h1>
            {itemsToRender}
        </div>);
}
export default StockList;


