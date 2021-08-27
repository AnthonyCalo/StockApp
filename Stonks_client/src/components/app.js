import {useState, useEffect} from 'react';
import StockDetail from './stockdetail';
import marketStack from '../apis/marketStack';
import StockList from './stocklist';
import alphavantage from '../apis/alphavantage';
import alphavantage2 from '../apis/alphavantage2';
import SearchBar from './SeachBar';
import {BrowserRouter as Router, Link,Route} from 'react-router-dom';
import Login from './Login';
import axios from 'axios';

const DarkTheme = {
    pageBackground: "black",
    titleColor: "green",
    taglineColor: "Lavender "
}
const App = ()=>{
    //useStateHooks______________________________________________________
    const [theme, setTheme] = useState("light");
    const [iconName, setIconName] = useState("moon")
    const [StockListInfo, SetStockListInfo] = useState([]); //info for stockList
    const [selectedStock, setSelectedStock] = useState([]); //stock selected to render details/ graph
    const [selectedDetails, setSelectedDetails]=useState([]); //info from api for select stock
    const [graphData, setGraphData] = useState([]); //30d graph data
    const [longGraphData, setLongGraph] = useState([]); //100d graph data
    const [search, setSearch] = useState(''); //search bar
    const [username, setUser] = useState('');
    const [isSignedIn, setSignInStatus] = useState(false);
    const [suggs, setSuggs]= useState([]); //search suggestions
    const [stocks, setStocks] = useState(["GOOG"]); //stock list. passed user stocks when signed in 

    //Format Date properly for API
    let date = new Date().toISOString().split('T')[0];
    let val = parseInt(date.slice(5,7), 10);
    let minOne = val-1;
    let mOneString = minOne.toString();
    let lastMonth = date.slice(0,6) + mOneString + date.slice(7,10);

    //API CALLS________________________________________________________________________________________________________
    const getStonks = async()=>{
        //get all stock list latest price/ basic info
        //called once when page loads
        var stonks= stocks.join();
        if(stocks.length===0){
            SetStockListInfo([])
            return;
        } 
        const response = await marketStack.get('/intraday/latest',{
            params: { symbols: `${stonks}`}
        });
        SetStockListInfo(response.data.data);
        return(response.data.data);       
        }

    const getLongData = async()=>{
        //100d graph info
        const response = await alphavantage2.get('',{
            params: {
                function: "TIME_SERIES_DAILY",
                symbol:selectedStock.symbol
            }
        });
        var timeseries= [];
        for(var i in response.data["Time Series (Daily)"]){
            timeseries.push({"Date":[i][0], "Data": response.data["Time Series (Daily)"] [i]});
        }
        setLongGraph(timeseries);
    }
    
    const searchBarCall=async(term)=>{
    //results are suggestions when searching. Called after each key press in search bar
        const response= await alphavantage.get(``,{
            params: {
                function: 'SYMBOL_SEARCH',
                keywords: term           }
        });
        setSuggs(response.data.bestMatches);
    }

    const getStockInfo=async()=>{
        //basic info for stockList / stockItem component
        const response= await alphavantage.get(``,{
            params: {
                function: 'OVERVIEW',
                symbol: selectedStock.symbol
            }
        });

        setSelectedDetails(response.data)
    }

    const getGraphInfo=async()=>{
    //30d graph info
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
        //checks if user signed in. If yes it retrieves the user's stock list and sets as stocks
        axios.get("http://localhost:3001/signedin",{
            withCredentials: true,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(response=>{
            //response.data ===false when not signed in 
            if(response.data===false){
                setSignInStatus(false);
                return(false);
            }else{
                setSignInStatus(true);
                setStocks(response.data.stock_list);
                setUser(response.data.username);
                return(true);
            }
        })
    }
    const signOut = ()=>{
        //simple logout
        axios.get("http://localhost:3001/logout",{
            withCredentials: true,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(response=>{
            //reload the page to call a use effect that will register signout
            window.location.reload();
        })
    }

    //useEffect hooks______________________________________________________________________________
    useEffect(()=>{
        getStonks()
    }, [stocks], [isSignedIn]);

    //get individual stock greater details.
    //called every time a stock is selected
    useEffect(()=>{
        if(selectedStock.length!==0){
            getStockInfo()
            getGraphInfo()
            getLongData()
        }else{
            console.log("NO stonk selected");
        }
    }, [selectedStock])
    //checks if user's signed in. called on 1st pageload. checks signed in status
    useEffect(async ()=>{
        checkSignIn();
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
            axios("http://localhost:3001/add_user_stock",{
                method: "POST",
                data:{
                    ticker: ticker
                },
                withCredentials: true //<- require for server to recognize cookies
            }).then((res)=>{
                checkSignIn();
            });
        }else{
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
                <div className="topRight"><Link to="/login">Click to login/ register</Link></div>
                )
        }
    }
    const addDark = ()=>{
        const body = document.body;
        console.log(body, "body");
        if(body.classList.contains("dark")){
            setIconName("moon")
            body.classList.remove("dark")
        }else{
            setIconName("sun");
            body.classList.add("dark");
        }
    }
    //Return/render__________________________________________________________________________________________________
    return(
        <Router>
            <Route exact path='/'>
            <>
                <div className="ui segment sticky top">
                    <h3 className="site_title">Calo Stock</h3>
                    <div className="themeChange"  onClick={()=>addDark()}>
                        <i className={`icon ${iconName}`} size="mid"></i>
                    </div>
                    <SearchBar suggs={suggs} onInputChange={handleChange} clickSugg={searchSelect} />
                    {topRightRender()}
                </div>
                <div className='container'>
                <div className="row">
                    <div className="col-md-8 stock-details">
                        <StockDetail stock={selectedStock} details={selectedDetails} longData={longGraphData} graphData={graphData}/>
                    </div>
                    <div className="col-md-4 " >
                        <StockList Stonks={StockListInfo} user={username} onStockSelect={selectStock} removeStock={removeStock}/>
                    </div>
                </div>
                </div>
            </>
            </Route>
            <Route path="/login">
            <div className="ui segment sticky top">
                <h1 className="homeNav"><Link to="/" id="homeNav">Back to HomePage</Link></h1>
                <div className="themeChangeLog"  onClick={()=>addDark()}>
                        <i className={`icon ${iconName}`} size="mid"></i>
                </div>
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



