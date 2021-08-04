import React from 'react';


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








