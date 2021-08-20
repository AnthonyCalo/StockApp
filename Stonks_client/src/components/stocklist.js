import React, {useEffect, useState} from 'react';
import StockItem from './stockitem';

const StockList = (props)=>{

    const [items, setItems] = useState([]);

    const itemsToRender= props.Stonks.map((item,index) =>{
        console.log(index)
        return(
            <StockItem key={index+1}stockData={item} onStockSelect={props.onStockSelect} removeStock={props.removeStock}/>
        )
    })
    const renderContent=()=>{
        if(props.Stonks.length===0){
            return(
                <div className="list-group-item stockItem">
                <h3>
                    Search to add stocks to your watch List
                </h3>
                </div>
                )
        }else{
            return(itemsToRender);
        }
    }
   return(
        <div className="list-group">
            <h1><center>{props.user} Stock List</center></h1>
            {renderContent()}
        </div>);
}
export default StockList;


