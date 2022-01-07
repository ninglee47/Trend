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
import { Container, Row, Col, Stack, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const Brand = styled.span`
  width: 380px;
  height: 64px;
  margin: 0 72px 0 0;
  font-size: 32px;
  font-weight: bold;
  line-height: 2;
  letter-spacing: normal;
  color: #424242;
`
const DropSelect = styled(Select)`
  width: 317px;
  height: 32px;
  margin: 17px 93px 15px 72px;
  object-fit: contain;
`
const NavSection = styled(Nav)`
  width: 54px;
  height: 21px;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #8d97d7;
`
const SiteName = styled.div`
  font-size: 28px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: normal;
  color: #424242;
  text-align: center;
`

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
        
        if (dat[0].indexOf("default") !== -1) {
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
      <Navbar>
        <Container>
          <Navbar.Brand><Brand>Exploring Trending Topics</Brand></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <DropSelect className="text-center" options={options} value={value} onChange={changeHandler} />
              <Stack direction='horizontal' gap={4}>
                <NavSection>Google</NavSection>
                <NavSection>Youtube</NavSection>
                <NavSection>Twitter</NavSection>
              </Stack>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Stack gap={3}>
        <Container>
          <Row className="justify-content-md-center">
            <SiteName>Google</SiteName>
            <GoogleCloud />
            
          </Row>
          <Row>
            <SiteName>Youtube</SiteName>
            <Col><YoutubeTrend /></Col> 
          </Row>
          <Row>
            <SiteName>Twitter</SiteName>
            <Col><TwitterTrend /></Col>
          </Row> 
        </Container>
      </Stack>
      
    </div>
  );
}

export default App;
