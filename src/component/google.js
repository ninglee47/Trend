import React from 'react';
import { useSelector} from 'react-redux'
import { TagCloud } from 'react-tagcloud'

function processTags(trend) {
    var tags = []
    trend.map((d, index)=>{
        var traffic = d.formattedTraffic.replace("K+", "")
        var query = d.title.query
        var prop = {url:d.shareUrl}
        var elm = {value:query, count: traffic, props:prop}
        tags.push(elm)
    })
    return tags
}

export default function GoogleTrend() {
    const trend = useSelector((state) => state.trend.valueGoogle)
    var tags = processTags(trend)
    
    if(trend.length === 0) {
        return(
            <div></div>
        )
    }

    return(
        <div>
             <h2>Google Keywords</h2>
             <TagCloud
                minSize={25}
                maxSize={45}
                tags={tags}
                onClick={tag => window.open(tag.props.url)}
             />     
        </div>
    );
}