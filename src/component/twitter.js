import React from 'react';
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';

function ListItem(props) {
    // Correct! There is no need to specify the key here:
    const title = props.value.name
    const url =  props.value.url
    
    if (props.value.tweet_volume == null) {
        return <li className='list-group-item'>
                  <a href={url} target='_blank' rel="noreferrer">{title}</a>
             </li>;
    } else {
        return <li className='list-group-item'>
        <a href={url} target='_blank' rel="noreferrer">{title}</a>
        <div>Tweet volume {props.value.tweet_volume}</div>
       </li>;
    }
}

function HashtagList(props) {
    const hashtags = props.value[0].trends;
    //console.log(hashtags)
   
    const listItems = hashtags.slice(0, 19).map((hashtag) =>
      // Correct! Key should be specified inside the array.
      <ListItem key={hashtag.name} value={hashtag} />
    );
    return (
      <ul className='list-group list-group-flush'>
        {listItems}
      </ul>
    );
}


export default function TwitterTrend() {
    const trend = useSelector((state) => state.trend.valueTwitter)
    //console.log(trend)

    if(trend.length === 0) {
        return(
            <div>
                <h2 className="text-center">Twitter Hashtags</h2>
                <p className="text-center">No data from the selected country</p>
            </div>
        )
    }

    return (
        <div className='card'>
            <h2 className="text-center card-header">Twitter Hashtags</h2>
            <HashtagList className='card-body' value={trend} />
        </div>
    )
}