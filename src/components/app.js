import React, {useState, useEffect} from 'react';
import StockDetail from './stockdetail';
import marketStack from '../apis/marketStack';
import StockList from './stocklist';
import StonkList2 from './stockList2';
import alphavantage from '../apis/alphavantage';
import SearchBar from './SeachBar';

const App = ()=>{
    //useStateHooks______________________________________________________
    const [stonkResults, setStonks] = useState([]); //info for stockList
    const [selectedStock, setSelectedStock] = useState([]); 
    const [selectedDetails, setSelectedDetails]=useState([]);
    const [graphData, setGraphData] = useState([]);
    const [search, setSearch] = useState('');
    const [suggs, setSuggs]= useState([]);
    const [stocks, setStocks] = useState(["SPY","V","MSFT","FB","AMD","ED","MKTX","NKE","SPLK","QCOM"]);

    //StockList__________________________________________________________________
    const stonks = stocks.join();
    //API CALLS________________________________________________________________________________________________________
    const getStonks = async()=>{
        //get all stock list latest price/ basic info
        //called once when page loads
        const response = await marketStack.get('/intraday/latest',{
            params: { symbols: `${stonks}`}
        });
        setStonks(response.data.data);
    }
    const searchBarCall=async(term)=>{
        const response= await alphavantage.get(``,{
            params: {
                function: 'SYMBOL_SEARCH',
                keywords: term           }
        });
        setSuggs(response.data.bestMatches);
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
        console.log('graph')
        console.log(response.data);
        setGraphData(response.data.data);

    }
    //useEffect hooks______________________________________________________________________________
    useEffect(()=>{
        
        getStonks();
        //console.log("stocks:");
        //console.log(stocks);
    }, [stocks])
    //get individual stock greater details.
    //called every time a stock is selected
    useEffect(()=>{
        if(selectedStock){
            getStockInfo();
            getGraphInfo();
        }else{
            console.log("NO stonk selected");
        }
    }, [selectedStock])
    useEffect(()=>{
        if(search){
            const timer = setTimeout(()=>{
                searchBarCall(search);
            }, 500)
            return ()=>{
                clearTimeout(timer);
            }
        }else{
            console.log(" no search");
        }
    }, [search])
    //other functions_______________________________________________________________________________________
    const selectStock=(stock)=>{
        setSelectedStock(stock);
    }
    const handleChange =(term)=>{
        setSearch(term);
    }
    const searchSelect=(ticker)=>{
        //console.log("ticker: ");
        //console.log(ticker);
        setStocks([...stocks, ticker]);
        //console.log(stocks);
    }
    const removeStock=(symbol)=>{
        const newStonks = stocks.filter(stock=>stock!==symbol);
        console.log(newStonks);
        setStocks(newStonks);
    }
    //Return/render__________________________________________________________________________________________________
    return(
        <div className='container'>
        <SearchBar suggs={suggs} onInputChange={handleChange} clickSugg={searchSelect} />
        <div className="row">
            <div className="col-md-8 stock-details">
                <StockDetail stock={selectedStock} details={selectedDetails} graphData={graphData}/>
            </div>
            <div className="col-md-4 " >
                <StockList Stonks={stonkResults} onStockSelect={selectStock} removeStock={removeStock}/>
            </div>
        </div>
    </div>
        )
}


export default App;



