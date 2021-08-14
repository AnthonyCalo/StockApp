import React from 'react';

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
const StonkList2 = props =>{
    const renderedList=props.stonks.map(stonk=>{
        return(
            <div>
                {stonk.symbol}
            </div>)
    })
    return(
        <div>
            
        </div>)
}


export default StonkList2;








