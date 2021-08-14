import React, {useEffect, useState} from 'react';
import StockItem from './stockitem';

const StockList = (props)=>{
    console.log(props);
    const [items, setItems] = useState([]);

    const itemsToRender= props.Stonks.map(item =>{
        return(
            <StockItem stockData={item} onStockSelect={props.onStockSelect} removeStock={props.removeStock}/>
        )
    })
    const renderContent=()=>{
        if(props.Stonks===[]){
            return(
                <h3>
                    Add stocks to your watch List
                </h3>)
        }else{
            return(itemsToRender);
        }
    }
   return(
        <div className="list-group">
            <h1><center>Stock List</center></h1>
            {renderContent()}
        </div>);
}
export default StockList;


