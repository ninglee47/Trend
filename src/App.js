import logo from './logo.svg';
import './App.css';
import GoogleTrend from './component/google'
import YoutubeTrend from './component/youtube';
import TwitterTrend from './component/twitter';
import GoogleCloud from './component/googleCloud';
import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { updateGoogleTrend, updateYoutubeTrend, updateTwitterTrend, updateTagData } from './redux/trendSlice';
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        
        if (dat[0].indexOf("default") != -1) {
          const trendGoogle = JSON.parse(dat[0]).default.trendingSearchesDays[0].trendingSearches
          dispatch(updateGoogleTrend(trendGoogle))
          const data = preprocess(trendGoogle)
          dispatch(updateTagData(data))
        } else {
          const dat = []
          dispatch(updateGoogleTrend(dat))
        }
        
        if (dat[1] != null) {
          const trendYoutube = dat[1]
          dispatch(updateYoutubeTrend(trendYoutube))
        } else {
          const dat = []
          dispatch(updateYoutubeTrend(dat))
        }
        
        if (dat[2] != null) {
          const trendTwitter = dat[2]
          dispatch(updateTwitterTrend(trendTwitter))
        }else {
          const dat = []
          dispatch(updateTwitterTrend(dat))
        }
      }
    )
  }

  return (
    <div>
      <h2 className="text-center">Trending Topics</h2>
      <Stack gap={3}>
        <Row className="justify-content-md-center">
          <Col xs lg="6">
            <Select className="text-center" options={options} value={value} onChange={changeHandler} />
          </Col>
        </Row>
        
        <Container>
          <Row>
            <Col><GoogleTrend /></Col>
            <Col xs={9}><GoogleCloud /></Col>
          </Row>
          <Row>
            <Col><YoutubeTrend /></Col> 
          </Row>
          <Row>
            <Col><TwitterTrend /></Col>
          </Row> 
        </Container>
      </Stack>
      
    </div>
  );
}

export default App;
