import React from 'react';
import { useSelector} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';

function ListItem(props) {
    // Correct! There is no need to specify the key here:
    const title = props.value.snippet.title
    const url =  "https://www.youtube.com/watch?v=" + props.value.id
    const channel = "https://www.youtube.com/channel/" + props.value.snippet.channelId
    return <li className='list-group-item'>
        <a href={url} target='_blank' rel="noreferrer">{title}</a>
        <div>
            Channel: 
            <a href={channel} target='_blank' rel="noreferrer">
            {props.value.snippet.channelTitle}
            </a>
        </div>
        <div>Views: {props.value.statistics.viewCount}</div>
    </li>
}

function VideoList(props) {
    const videos = props.value;
    const listItems = videos.map((video) =>
      // Correct! Key should be specified inside the array.
      <ListItem key={video.id} value={video} />
    );
    return (
      <ul className='list-group list-group-flush'>
        {listItems}
      </ul>
    );
}


export default function YoutubeTrend() {
    const trend = useSelector((state) => state.trend.valueYoutube)
    //console.log(trend)

    if(trend.length === 0) {
        return(
            <div>
                <h2 className="text-center">Youtube Videos</h2>
                <p className="text-center">No data from the selected country</p>
            </div>
        )
    }

    return (
        <div className='card'>
            <h2 className="text-center card-header">Youtube Videos</h2>
            <VideoList  className='card-body' value={trend} />
        </div>
    )
}