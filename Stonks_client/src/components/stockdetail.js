import React, {useState, useEffect} from 'react';
import alphavantage from '../apis/alphavantage';
import LineGraph from './graph';
import Accordion from './Accordion';



const StockDetail=({stock, details, graphData, longData})=>{
    const [deets, setDeets] = useState({})
    const getDeets =async(symbol)=>{
        const response = await alphavantage.get('',{
            params: { 
                function: "GLOBAL_QUOTE",
                symbol: symbol
            }
        });
     //TO DO CLOSE
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
        setDeets(StockInfo);
     }catch(err){
         console.log(err, "ERROR API");
         var APILIMIT={
            "open": "API limit reached",
            "close": "API LIMIT reached",
            "symbol": stock,
            "volume": "API LIMIT REACHED",
            "lastDay": "API LIMIT REACHED",
            "prevClose": "API LIMIT REACHED",
            "change" : "API Limit Reached",
            "changePct": "API LIMIT REACHED",
            "high": "API LIMIT REACHED" 
        }
        if(err){
        setDeets(APILIMIT);

        }
     }
     
    }
    useEffect(()=>{
        if(details){
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
    return(
        <div className="ui segment stock_detail_card">
            <h1>{details.Name}</h1>
            <p>{details.Symbol}</p>
            <div className="graphTime">
                <button id="trenta" className="thirtyButton timeBtn selectedGraph" onClick={(e)=>handleGTime(e)}>30d</button>
                <button id="cento" className="centoButton timeBtn" onClick={(e)=>handleGTime(e)}>100d</button>
            </div>
            <LineGraph graphData={graphData} longData={longData} graphTime={graphTime}/>
            <div className="details_stock">
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

            </div>
        </div>
        )
        
}

export default StockDetail;





