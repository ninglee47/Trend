import React from 'react';
import { useSelector} from 'react-redux'

function ListItem(props) {
    // Correct! There is no need to specify the key here:
    const title = props.value.snippet.title
    const url =  "https://www.youtube.com/watch?v=" + props.value.id
    return <li><a href={url} target='_blank' rel="noreferrer">{title}</a></li>;
}

function VideoList(props) {
    const videos = props.value;
    const listItems = videos.map((video) =>
      // Correct! Key should be specified inside the array.
      <ListItem key={video.id} value={video} />
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
}


export default function YoutubeTrend() {
    const trend = useSelector((state) => state.trend.valueYoutube)
    console.log(trend)

    if(trend.length === 0) {
        return(
            <div></div>
        )
    }

    return (
        <div>
            <h2>Youtube</h2>
            <VideoList value={trend} />
        </div>
    )
}