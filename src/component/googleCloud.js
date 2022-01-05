import React, {useState ,useEffect} from 'react';
import { useSelector} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { TagCloud } from 'react-tagcloud'

function preprocess(trend) {
    let data = []
    trend.map((item)=> {
        var elm ={}
        var num = item.formattedTraffic.replace('K+', '')
        elm.value = item.title.query
        elm.count = parseInt(num) + 5*parseInt(num) 
        data.push(elm)
    })
    console.log(data)
    return data
}

export default function GoogleCloud() {
    const trend = useSelector((state) => state.trend.tagData)
    //console.log(trend)

    const options = {
        luminosity: 'dark',
        hue: '#00FFFF'
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
        <div className='card'>
             <h2 className="text-center card-header">Google Keywords Cloud</h2>
             <TagCloud
                minSize={25}
                maxSize={200}
                tags={trend}
                colorOptions={options}
                onClick={tag => alert(`'${tag.value}' was selected!`)}
             />
             
        </div>
    );
}