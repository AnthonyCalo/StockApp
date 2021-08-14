import React, {useState, useEffect} from 'react';
import StockDetail from './stockdetail';
import marketStack from '../apis/marketStack';
import StockList from './stocklist';
import alphavantage from '../apis/alphavantage';
import SearchBar from './SeachBar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Login';
import axios from 'axios';

const App = ()=>{
    //useStateHooks______________________________________________________
    const [StockListInfo, SetStockListInfo] = useState([]); //info for stockList
    const [selectedStock, setSelectedStock] = useState([]); 
    const [selectedDetails, setSelectedDetails]=useState([]);
    const [graphData, setGraphData] = useState([]);
    const [search, setSearch] = useState('');
    const [username, setUser] = useState('');
    const [isSignedIn, setSignInStatus] = useState(false)
    const [suggs, setSuggs]= useState([]);
    const [stocks, setStocks] = useState(["V","MSFT"]);

        //Format Date properly for API
        let date = new Date().toISOString().split('T')[0];
        let val = parseInt(date.slice(5,7), 10);
        let minOne = val-1;
        let mOneString = minOne.toString();
        let lastMonth = date.slice(0,6) + mOneString + date.slice(7,10);
    //API CALLS________________________________________________________________________________________________________
    const getStonks = async()=>{
        var stonks= stocks.join();
        if(!stocks){
            return;
        }
        //get all stock list latest price/ basic info
        //called once when page loads
            const response = await marketStack.get('/intraday/latest',{
                params: { symbols: `${stonks}`}
            });
            SetStockListInfo(response.data.data);
            return(response.data.data);
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
    const checkSignIn=()=>{
        axios.get("http://localhost:3001/signedin",{
            withCredentials: true,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(response=>{
            //respons.data ===false when not signed in 
            if(response.data===false){
                console.log("SIGN IN FALSE");
                setSignInStatus(false);
                return(false);
            }else{
                setSignInStatus(true);
                setStocks(response.data.stock_list);
                return(true);
            }
        })
    }
    const signOut = ()=>{
        axios.get("http://localhost:3001/logout",{
            withCredentials: true,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(response=>{
            checkSignIn();    
        })
    }
    //useEffect hooks______________________________________________________________________________
    useEffect(()=>{
        console.log("GETTING STOCKS");
        console.log(stocks, "<- BEFORE GET STONKS");
        getStonks()
        //console.log("stocks:");
        //console.log(stocks);
    }, [stocks], [isSignedIn])
    //get individual stock greater details.
    //called every time a stock is selected
    useEffect(()=>{
        if(selectedStock){
            getStockInfo()
            getGraphInfo()
        }else{
            console.log("NO stonk selected");
        }
    }, [selectedStock])
    useEffect(async ()=>{
        let signed_in = checkSignIn();

    },[]);
    
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
        if(isSignedIn){
            //WOn't set credentials. Unauthenticated request from server even when signed in
            // axios.post("http://localhost:3001/add_user_stock", {
            //     withCredentials: true,
            //     body: {
            //         ticker: ticker
            //     }

            //     })
            console.log("check sign in true");
            axios("http://localhost:3001/add_user_stock",{
                method: "POST",
                data:{
                    ticker: ticker
                },
                withCredentials: true
            });
        }else{
            console.log("TICKER", ...stocks);
            setStocks([ticker,...stocks]);
        }
        //console.log(stocks);
    }
    
    const removeStock=(symbol)=>{
        if(!isSignedIn){
            const newStonks = stocks.filter(stock=>stock!==symbol);
            setStocks(newStonks);
        }else{
            axios("http://localhost:3001/remove_user_stock", {
                method: "POST",
                data:{
                    ticker: symbol
                },
                withCredentials: true
            }).then(res=>{
                console.log(res)
                checkSignIn()}
                );
        }
        
    }
    const topRightRender=()=>{
        if(isSignedIn){
            return(
                <div  className="topRight" onClick={signOut}>Sign Out</div>
            )
        }else{
            return(
                <div className="topRight"><a href="/login">Click to login/ register</a></div>
                )
        }
    }
    //Return/render__________________________________________________________________________________________________
    return(
        <Router>
            <Route exact path='/'>
            <>
                <div className="ui segment sticky top">
                    <h3 className="site_title">Calo Stock</h3>
                    <SearchBar suggs={suggs} onInputChange={handleChange} clickSugg={searchSelect} />
                    {topRightRender()}
                </div>
                <div className='container'>
                <div className="row">
                    <div className="col-md-8 stock-details">
                        <StockDetail stock={selectedStock} details={selectedDetails} graphData={graphData}/>
                    </div>
                    <div className="col-md-4 " >
                        <StockList Stonks={StockListInfo} onStockSelect={selectStock} removeStock={removeStock}/>
                    </div>
                </div>
                </div>
            </>
            </Route>
            <Route path="/login">
            <div className="ui segment sticky top">
                <h1><a href="/" id="homeNav">Back to HomePage</a></h1>
                <div className="logTitle">
                    <h1 className="logTitle">Calo Stocks</h1>                
                </div>
            </div>
                <Login />
            </Route>
        </Router>
        
        )
}


export default App;



