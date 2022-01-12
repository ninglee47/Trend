import React from 'react';
import { useSelector } from 'react-redux'
import EmptyDiv from './empty';
import { TagCloud } from 'react-tagcloud'

export default function TwitterCloud() {
    const trend = useSelector((state) => state.trend.twitterTagData)
    console.log(trend)

    const options = {
        luminosity: 'bright',
        hue: '#50c5f2'
    }

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
                minSize={12}
                maxSize={80}
                tags={trend}
                colorOptions={options}
                onClick={tag => window.open(tag.props.url, '_blank').focus()}
             />
             
        </div>
    )
}