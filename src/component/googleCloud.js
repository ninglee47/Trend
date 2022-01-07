import React, {useState ,useEffect} from 'react';
import { useSelector} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { TagCloud } from 'react-tagcloud'

export default function GoogleCloud() {
    const trend = useSelector((state) => state.trend.tagData)
    //console.log(trend)

    const options = {
        luminosity: 'bright',
        hue: '#5B92ED'
    }

    //console.log(options)
    
    if(trend.length === 0) {
        return(
            <div>
                <h2 className="text-center">Google Keywords Cloud</h2>
                <p className="text-center">No data from the selected country</p>
            </div>
        )
    }

    return(
        <div>
             
             <TagCloud
                minSize={25}
                maxSize={100}
                tags={trend}
                colorOptions={options}
                onClick={tag => alert(`'${tag.value}' was selected!`)}
             />
             
        </div>
    );
}