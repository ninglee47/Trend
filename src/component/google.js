import React from 'react';
import { useSelector} from 'react-redux'

function ListItem(props) {
    // Correct! There is no need to specify the key here:
    const title = props.value.title.query
    const url =  props.value.shareUrl
    return <li><a href={url} target='_blank' rel="noreferrer">{title}</a></li>;
}

function KeyList(props) {
    const keywords = props.value;
    console.log(keywords)
   
    const listItems = keywords.slice(0, 9).map((keyword, index) =>
      // Correct! Key should be specified inside the array.
      <ListItem key={index} value={keyword} />
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
}

export default function GoogleTrend() {
    const trend = useSelector((state) => state.trend.valueGoogle)
    console.log(trend)
    
    if(trend.length === 0) {
        return(
            <div>
                <h2>Google Keywords</h2>
                <p>No data from the selected country</p>
            </div>
        )
    }

    return(
        <div>
             <h2>Google Keywords</h2>
             <KeyList value={trend}/>
        </div>
    );
}