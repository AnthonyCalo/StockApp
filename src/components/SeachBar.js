import React from 'react';
import './search.css'

export default class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            term: "",
            //tells whether or not suggestion bar is open
            open: false
        };
        
    }
    //called every time text is typed  
    changeHandler=(event)=>{
        this.setState({term: event.target.value})
        if(this.state.term.length>1){
            this.setState({open: true});
        }else{
            console.log("here closed");
            this.setState({open: false});
        }
        //sends back the term to app.js so it can make an api call
        this.props.onInputChange(this.state.term);

    }
    
    handleSumbit=event=>{
        event.preventDefault();
        //passing this.state.term from child(searchbar) to parent (app.js)

    };
    //when you click a suggestion. Close the suggestioins and empty the searchBar
    //maybe call a props function to pass the chosen suggstion
    chooseStonk=(option)=>{
        console.log("chose Stonk: ");
        console.log(option);
        this.props.clickSugg(option['1. symbol']);
        this.setState({open: false, term: ''});

    }
    renderedOptions=()=>{
        if(this.props.suggs && this.state.open){
            var suggestions = this.props.suggs.map((sugg)=>{
                return(
                    <div className="item suggestions" onClick={()=>this.chooseStonk(sugg)}>
                        {sugg["1. symbol"]}: &nbsp;&nbsp; {sugg["2. name"]}
                    </div>)
            });
            return suggestions;
        }else{
            return(
                <div>
                    
                </div>)
        }
        
    } 
    render(){
        return(
            <div className='searchBar ui sticky'>
                <form className='ui form' onSubmit={this.handleSumbit}>
                    <div className='field'>
                        <input type='text' value={this.state.term} onChange={this.changeHandler} autoFocus></input>
                        <div 
                            className={`ui selection ${this.open ? 'visible active': ''}`}
                            
                            >                    
                    <div className="text"></div>
                    
                    <div className={`menu ${this.open ? 'visible transition': ''}`} onClick={()=>this.setState({open: false})}> {this.renderedOptions()}</div>
                </div>
                    </div>
                </form>
            </div>             
            );
    }
}




