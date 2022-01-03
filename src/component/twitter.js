import React from 'react';
import { useSelector} from 'react-redux'

function ListItem(props) {
    // Correct! There is no need to specify the key here:
    const title = props.value.name
    const url =  props.value.url
    return <li><a href={url} target='_blank' rel="noreferrer">{title}</a></li>;
}

function HashtagList(props) {
    const hashtags = props.value[0].trends;
    console.log(hashtags)
   
    const listItems = hashtags.slice(0, 9).map((hashtag) =>
      // Correct! Key should be specified inside the array.
      <ListItem key={hashtag.name} value={hashtag} />
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
}


export default function TwitterTrend() {
    const trend = useSelector((state) => state.trend.valueTwitter)
    console.log(trend)

    if(trend.length === 0) {
        return(
            <div>
                <h2>Twitter Hashtags</h2>
                <p>No data from the selected country</p>
            </div>
        )
    }

    return (
        <div>
            <h2>Twitter Hashtags</h2>
            <HashtagList value={trend} />
        </div>
    )
}