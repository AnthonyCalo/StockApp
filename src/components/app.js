import React, {useState, useEffect} from 'react';
import StockDetail from './stockdetail';
import marketStack from '../apis/marketStack';
import StockList from './stocklist';
import StonkList2 from './stockList2';

const App = ()=>{
    const [stonkResults, setStonks] = useState([]);
    useEffect(()=>{
        const getStonks = async()=>{
            const response = await marketStack.get('/eod/latest',{
                params: { symbols: "AMZN,MSFT,FB,ED" }
            });
            console.log("response app");
            console.log(response.data);
            setStonks(response.data.data);
        }
        getStonks();
    }, [])
    
    return(
        <div>
            <StockList Stonks={stonkResults} />
        </div>
        )
}


export default App;



