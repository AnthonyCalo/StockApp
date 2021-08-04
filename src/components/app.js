import React, {useState, useEffect} from 'react';
import StockDetail from './stockdetail';
import marketStack from '../apis/marketStack';
import StockList from './stocklist';
import StonkList2 from './stockList2';
import alphavantage from '../apis/alphavantage';

const App = ()=>{
    const [stonkResults, setStonks] = useState([]);
    const [selectedStock, setSelectedStock] = useState([]);
    const [selectedDetails, setSelectedDetails]=useState([]);
    var stocks = ["SPY","V","MSFT","FB","AMD","ED","MKTX","NKE","SPLK","QCOM"];
    const stonks = stocks.join();
    console.log(stonks);
    //get all stock list latest price/ basic info
    //called once when page loads
    useEffect(()=>{
        const getStonks = async()=>{
            const response = await marketStack.get('/intraday/latest',{
                params: { symbols: `${stonks}`}
            });
            setStonks(response.data.data);
        }
        getStonks();
    }, [])
    //get individual stock greater details.
    //called every time a stock is selected
    useEffect(()=>{
        const getStockInfo=async()=>{
            const response= await marketStack.get(`/tickers/${selectedStock.symbol}`);
            console.log("called getInfo");
            console.log(response.data);
            setSelectedDetails(response.data)
        }
        getStockInfo();
    }, [selectedStock])
    const selectStock=(stock)=>{
        setSelectedStock(stock);
    }
    return(
        <div className='container'>
        <h1 className="site_title">Stonks</h1>
        <div className="row">
            <div className="col-md-8 stock-details">
                <StockDetail stock={selectedStock} details={selectedDetails}/>
            </div>
            <div className="col-md-4 " >
                <StockList Stonks={stonkResults} onStockSelect={selectStock}/>
            </div>
        </div>
    </div>
        )
}


export default App;



