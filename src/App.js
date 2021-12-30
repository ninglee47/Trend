import logo from './logo.svg';
import './App.css';
import GoogleTrend from './component/google'
import YoutubeTrend from './component/youtube';
import TwitterTrend from './component/twitter';
import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { updateGoogleTrend, updateYoutubeTrend, updateTwitterTrend } from './redux/trendSlice';
import { useSelector, useDispatch } from 'react-redux'

async function getTrend(country) {
  var option = {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(country)
  }

  var res = await fetch("/trend", option)
  var dat = await res.json()
  
  return dat
}

function App() {
  //Global state
  const trend = useSelector((state) => state.trend.value)
  const dispatch = useDispatch()

  //Local state
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setValue(value)
    console.log(value)
    getTrend(value).then(
      dat => {
        console.log(dat)
        const trendGoogle = JSON.parse(dat[0]).default.trendingSearchesDays[0].trendingSearches
        dispatch(updateGoogleTrend(trendGoogle))

        const trendYoutube = dat[1]
        dispatch(updateYoutubeTrend(trendYoutube))

        const trendTwitter = dat[2]
        dispatch(updateTwitterTrend(trendTwitter))
      }
    )
  }

  return (
    <div>
      <h2>Google Trends</h2>
      <Select options={options} value={value} onChange={changeHandler} />
      <GoogleTrend />
      <YoutubeTrend />
      <TwitterTrend />
    </div>
  );
}

export default App;
