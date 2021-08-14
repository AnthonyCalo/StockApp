import React, {useState} from 'react';

const Accordion =({ items })=>{
    const [activeIndex, setActiveIndex]=useState(null);

    const onTitleClick=(index)=>{
        if(activeIndex===index.index){
            setActiveIndex(null);
        }else{
            setActiveIndex(index.index);
        }
        //console.log(index);
    }
    const renderedItems = items.map((item, index)=>{
        if(activeIndex===index){
            return(
            <React.Fragment key={index}>
                <div
                className="title active"
                onClick={()=>{onTitleClick({index})}}
                >
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>

                <div className="content active">
                    <p>{item.content}</p>
                </div>
            </React.Fragment>)}
        else{
            return(
            <React.Fragment key={index}>
                <div
                    className="title "
                    onClick={()=>{onTitleClick({index})}}
                >
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>
            </React.Fragment>)
        }
    })
    return (
        <div className="ui styled accordion">
            {renderedItems}
        </div>     
    )
}

export default Accordion;




