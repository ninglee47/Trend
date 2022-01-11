import React from 'react';
import { useSelector} from 'react-redux'


function RelatedItem(props) {
    // Correct! There is no need to specify the key here:
    const title = props.value.query
    const domian = "https://trends.google.com/"
    const url =  domian + props.value.exploreLink
    
    return <li className='list-inline-item'>
        <a href={url} target='_blank' rel="noreferrer">{title} </a>
    </li>;
}

function ListItem(props) {
    // Correct! There is no need to specify the key here:
    const title = props.value.title.query
    const url =  props.value.shareUrl
    
    const listItems = props.value.relatedQueries.map((keyword) =>
      // Correct! Key should be specified inside the array.
      <RelatedItem key={keyword.query} value={keyword} />
    );

    return <div className='list-group-item'>
        <a href={url} target='_blank' rel="noreferrer">{title}
           
        </a>
        <div><span>Traffic: {props.value.formattedTraffic}</span></div>
        <div>Related queries: 
            <div>{listItems}</div>
        </div>
    </div>;
}

function KeyList(props) {
    const keywords = props.value;
    //console.log(keywords)
   
    const listItems = keywords.map((keyword, index) =>
      // Correct! Key should be specified inside the array.
      <ListItem key={index} value={keyword} />
    );
    return (
      <ul className='list-group list-group-flush'>
        {listItems}
      </ul>
    );
}

export default function GoogleTrend() {
    const trend = useSelector((state) => state.trend.valueGoogle)
    //console.log(trend)
    
    if(trend.length === 0) {
        return(
            <div>
                <h2 className="text-center">Google Keywords</h2>
                <p className="text-center">No data from the selected country</p>
            </div>
        )
    }

    return(
        <div className='card'>
             <h2 className="text-center card-header">Google Keywords</h2>
             <KeyList className='card-body' value={trend}/>
        </div>
    );
}