import React, {useEffect, useState} from 'react';

const StockList = (props)=>{
    const [items, setItems] = useState([]);
    // useEffect(()=>{
    //     console.log("value CHANGEd to: ");
    //     console.log(props);
    //     if(props){
    //         setItems(props.Stonks);  

    //         console.log(items);
    //     }    
    // }, [props])
//    let itemsToRender; 
//    if(items.length){
//        itemsToRender = items.map(item =>{
//            return(
//                 <div>
//                     <h2>{item.symbol}</h2>
//                     <p>Close: {item.close}</p>
//                 </div>
//            )
//        })
//    }else{
//        console.log("there are no items");
//        itemsToRender="loading...";
//        //itemsToRender="Loading.."
//    }
    const itemsToRender= props.Stonks.map(item =>{
        return(
            <div key={item.symbol}>
                <h2>{item.symbol}</h2>
                <p>Close: {item.close}</p>
            </div>
        )
    })
   return(
        <div className="STONKLIST">
            {itemsToRender}
        </div>);
}
export default StockList;


