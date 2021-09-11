import React, {useState, useEffect} from 'react';
import alphavantage3 from '../apis/alphavantage3';
import LineGraph from './graph';
import Accordion from './Accordion';



const StockDetail=({stock, details, graphData, longData})=>{
    const [deets, setDeets] = useState({});
    const [limited, setLimited]=useState(false); //whether or not there is an api issue
    const getDeets =async(symbol)=>{
        console.log("GD called");
        const response = await alphavantage3.get('',{
            params: { 
                function: "GLOBAL_QUOTE",
                symbol: symbol
            }
        });
     try{
        var StockInfo={
            "open": response.data["Global Quote"]["02. open"],
            "close": response.data["Global Quote"]["05. price"],
            "symbol": stock,
            "volume": response.data["Global Quote"]["06. volume"],
            "lastDay": response.data["Global Quote"]["07. latest trading day"],
            "prevClose": response.data["Global Quote"]["08. previous close"],
            "change" : response.data["Global Quote"]["09. change"],
            "changePct" : response.data["Global Quote"]["10. change percent"],
            "high": response.data["Global Quote"]["03. high"]
        }
        setLimited(false);

        setDeets(StockInfo);
     }catch(err){
        console.log(err, "ERROR API");
        setLimited(true);
     }
     
    }
    useEffect(()=>{
        if(stock){
            getDeets(details.Symbol);
        }
    },[details])
    

    const [graphTime, setGraphTime] = useState('30d');
    const items=
        [
            {
                title: "See company details",
                content: details.Description
            }
        ]
    const renderPrice=()=>{
        let day = new Date();
        if (day.getHours()>16 || day.getHours()<9 || day.getDay() === 6 || day.getDay()===0){
            return(deets.close)
        }else{
            return(stock.last)
        }
    }
    const handleGTime=(event)=>{
        if(event.target.innerHTML==="100d"){
            document.getElementById("trenta").classList.remove("selectedGraph");
            document.getElementById('cento').classList.add("selectedGraph");
            setGraphTime('100d');
        }else{
            document.getElementById("cento").classList.remove("selectedGraph");
            document.getElementById('trenta').classList.add("selectedGraph");
            setGraphTime('30d')
        }
    }
    const renderDetails=()=>{
        if(!limited){
            return(
            <div className="ui divided list stock_info">
            <div className="item">
                <div className="ui right floated content">${renderPrice()}</div>
                <div className="content">Price: </div>
            </div>
            <div className="item">
                <div className="ui right floated content">${deets.change}</div>
                <div className="content">Change: </div>
            </div>
            <div className="item">
                <div className="ui right floated content">{deets.changePct}</div>
                <div className="content">Change Percentage: </div>
            </div>
            <div className="item">
                <div className="ui right floated content">${stock.open}</div>
                <div className="content">Open: </div>
            </div>
            <div className="item">
                <div className="ui right floated content">{deets.lastDay}</div>
                <div className="content">Last trading day: </div>
            </div>
            <div className="item">
                <div className="ui right floated content">${stock.low}</div>
                <div className="content">Daily Low: </div>
            </div>
            <div className="item">
                <div className="ui right floated content">${deets.high}</div>
                <div className="content">Daily High: </div>
            </div>
            <div className="item">
                <div className="ui right floated content">{deets.volume}</div>
                <div className="content">Volume: </div>
            </div>
            <div className="item">
                <div className="ui right floated content">${details["52WeekHigh"]}</div>
                <div className="content">52 Week High: </div>
            </div>
            <div className="item">
                <div className="ui right floated content">${details["52WeekLow"]}</div>
                <div className="content">52 Week Low: </div>
            </div>
            <div className="item">
                <div className="ui right floated content">{details["EPS"]}</div>
                <div className="content">EPS: </div>
            </div>
            <div className="item">
                <div className="ui right floated content">{details["PERatio"]}</div>
                <div className="content">PE ratio: </div>
            </div>
            <div className="item">
                <div className="ui right floated content">{details["DividendYield"]}</div>
                <div className="content">Dividend Yield: </div>
            </div>
            <div className="item">
               <Accordion items={ items } />
            </div>
            </div>
            )

        }else{
            return(
                <div className="apiIssue item">
                    Free API LIMIT Reached or No stock selected.<br/>
                    Please Wait 60 seconds and try again.<br/>
                    Apologies for the wait
                </div>)
        }
    }
    const renderHead=()=>{
        if(details["Note"]){
            return( 
                <h1>{stock.symbol}</h1>
            )
        }else{
            return ( 
                <>
                <h1>{details.Name}</h1>
                <p>{details.Symbol}</p>
                </>
            )
        }
    }
    return(
        <div className="ui segment stock_detail_card">
            {renderHead()}
            <div className="graphTime">
                <button id="trenta" className="thirtyButton timeBtn selectedGraph" onClick={(e)=>handleGTime(e)}>30d</button>
                <button id="cento" className="centoButton timeBtn" onClick={(e)=>handleGTime(e)}>100d</button>
            </div>
            <LineGraph graphData={graphData} longData={longData} graphTime={graphTime}/>
            <div className="details_stock">
            {renderDetails()}

            </div>
        </div>
        )
        
}

export default StockDetail;





