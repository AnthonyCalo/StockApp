import React from 'react';
import marketStack from '../apis/marketStack';



class StockDetail extends React.Component {
    state = {stonkResponse: []}
    componentDidMount(){
        const getStonks = async()=>{
            const response = await marketStack.get('/eod/latest',{
                params: { symbols: "AMZN,MSFT" }
            })
            console.log("resonse");
            console.log(response.data);
            this.setState({stonkResponse: response.data.data});
            console.log(this.state)
        }
        getStonks();
        const renderedList = this.state.stonkResponse.map(stonk=>{
            return(
            <div>
                <h2>{stonk.symbol}</h2>
                <p>{stonk.close}</p>
            </div>)
        })
    }
   
 
    
    render() {
        return(
            <div className='stonks'>{this.renderedList}</div>
        )
    }


}

export default StockDetail;





