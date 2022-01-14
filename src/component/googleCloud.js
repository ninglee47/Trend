import React from 'react';
import { useSelector} from 'react-redux'
import EmptyDiv from './empty';
import { TagCloud } from 'react-tagcloud'


export default function GoogleCloud() {
    const trend = useSelector((state) => state.trend.tagData)
    console.log(trend)

    const options = {
        luminosity: 'bright',
        hue: '#5B92ED'
    }

    //console.log(options)
    
    if(trend.length === 0) {
        return(
            <div>
                <EmptyDiv />
            </div>
        )
    }

    return(
        <div>
             
             <TagCloud
                minSize={15}
                maxSize={80}
                tags={trend}
                colorOptions={options}
                onClick={tag => window.open(tag.props.shareurl, '_blank').focus()}
             />
             
        </div>
    );
}