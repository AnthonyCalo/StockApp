import React, {useState, useEffect} from 'react';
import StockDetail from './stockdetail';
import marketStack from '../apis/marketStack';
import StockList from './stocklist';
import StonkList2 from './stockList2';
import alphavantage from '../apis/alphavantage';

const App = ()=>{
    //useStateHooks______________________________________________________
    const [stonkResults, setStonks] = useState([]);
    const [selectedStock, setSelectedStock] = useState([]);
    const [selectedDetails, setSelectedDetails]=useState([]);
    const [graphData, setGraphData] = useState([]);
    //StockList__________________________________________________________________
    var stocks = ["SPY","V","MSFT","FB","AMD","ED","MKTX","NKE","SPLK","QCOM"];
    const stonks = stocks.join();
    console.log(stonks);
    //API CALLS________________________________________________________________________________________________________
    const getStonks = async()=>{
        //get all stock list latest price/ basic info
        //called once when page loads
        const response = await marketStack.get('/intraday/latest',{
            params: { symbols: `${stonks}`}
        });
        setStonks(response.data.data);
    }
    const getStockInfo=async()=>{
        const response= await alphavantage.get(``,{
            params: {
                function: 'OVERVIEW',
                symbol: selectedStock.symbol
            }
        });
        //console.log("called getInfo");
        //console.log(response.data);
        setSelectedDetails(response.data)
    }
    //Format Date properly for API
    let date = new Date().toISOString().split('T')[0];
    let val = parseInt(date.slice(5,7), 10);
    let minOne = val-1;
    let mOneString = minOne.toString();
    let lastMonth = date.slice(0,6) + mOneString + date.slice(7,10);
    const getGraphInfo=async()=>{
        const response = await marketStack.get('/eod',{
            params: {
                symbols: selectedStock.symbol,
                date_from:lastMonth,
                date_to:date
            }   
        });
        setGraphData(response.data.data);

    }
    //useEffect hooks______________________________________________________________________________
    useEffect(()=>{
        
        getStonks();
    }, [])
    //get individual stock greater details.
    //called every time a stock is selected
    useEffect(()=>{
        if(selectedStock){
            getStockInfo();
            getGraphInfo();
        }
    }, [selectedStock])

    const selectStock=(stock)=>{
        setSelectedStock(stock);
    }
    return(
        <div className='container'>
        <h1 className="site_title">Stonks</h1>
        <div className="row">
            <div className="col-md-8 stock-details">
                <StockDetail stock={selectedStock} details={selectedDetails} graphData={graphData}/>
            </div>
            <div className="col-md-4 " >
                <StockList Stonks={stonkResults} onStockSelect={selectStock}/>
            </div>
        </div>
    </div>
        )
}


export default App;



