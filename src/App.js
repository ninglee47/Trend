import logo from './logo.svg';
import './App.css';
import GoogleTrend from './component/google'
import YoutubeTrend from './component/youtube';
import TwitterTrend from './component/twitter';
import GoogleCloud from './component/googleCloud';
import TwitterCloud from './component/twitterCloud';
import React, { useState, useMemo, useRef } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { updateGoogleTrend, updateYoutubeTrend, updateTwitterTrend, updateTagData, updateTwitterTagData } from './redux/trendSlice';
import { useSelector, useDispatch } from 'react-redux'
import { ChakraProvider, Grid, GridItem, Text, VStack, Box, Checkbox, Stack, Wrap, extendTheme, Center, Button} from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    checkbox: {box: "#5a67b2"}
  },
})

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

function preprocessGoogle(trend) {
  let data = []
  trend.map((item)=> {
      var elm = {}
      var shareurl = {shareurl: item.shareUrl}
      var num = item.formattedTraffic.replace('K+', '')
      elm.value = item.title.query
      elm.count = parseInt(num) + 5*parseInt(num) 
      elm.props = shareurl
      data.push(elm)
  })
  //console.log(data)
  return data
}

function preprocessTwitter(trend) {
  let data = []
  trend[0].trends.map((item)=>{
    var elm = {}
    elm.value = item.name
    elm.count = item.tweet_volume
    elm.props = {url: item.url}
    data.push(elm)
  })
  return data
}

function ViewChangeGoogle(prop) {
  const checked = prop.isTicked
  if (checked) {
    return <GoogleCloud />
  } 
    return <GoogleTrend />
}

function ViewChangeTwitter(prop) {
  const checked = prop.isTicked
  if (checked) {
    return <TwitterCloud />
  } 
    return <TwitterTrend />
}

function App() {
  //Global state
  const trend = useSelector((state) => state.trend.value)
  const dispatch = useDispatch()

  //Local state
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  //View switch
  const [checkedItemsGoogle, setCheckedItemsGoolge] = React.useState([true, false])
  const [checkedItemsTwitter, setCheckedItemsTwitter] = React.useState([true, false])

  //Scroll down button
  const googleRef = useRef(null)
  const youtubeRef = useRef(null)
  const twitterRef = useRef(null)
  const googleScroll = () => {googleRef.current.scrollIntoView()}
  const youtubeScroll = () => {youtubeRef.current.scrollIntoView()}
  const twitterScroll = () => {twitterRef.current.scrollIntoView()}
  
  
  
  //Dropdown menu event handler
  const changeHandler = value => {
    setValue(value)
    //console.log(value)
    getTrend(value).then(
      dat => {
        //console.log(dat)
        
        if (dat[0].indexOf("default") !== -1) {
          const trendGoogle = JSON.parse(dat[0]).default.trendingSearchesDays[0].trendingSearches
          dispatch(updateGoogleTrend(trendGoogle))
          const data = preprocessGoogle(trendGoogle)
          dispatch(updateTagData(data))
        } else {
          const dat = []
          dispatch(updateGoogleTrend(dat))
          dispatch(updateTagData(dat))
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
          const data = preprocessTwitter(trendTwitter)
          dispatch(updateTwitterTagData(data))
        }else {
          const dat = []
          dispatch(updateTwitterTrend(dat))
          dispatch(updateTwitterTagData(dat))
        }
      }
    )
  }
  
  return (
    <ChakraProvider theme={theme}>
        <Grid templateColumns='repeat(10, 1fr)' gap={6} mt='56px' mb='40px'>
          <GridItem ml='8px' colSpan={3}>
            <Text fontSize={32} fontWeight={'bold'} fontFamily={'NunitoSans'} color={'#424242'}>
              Exploring Trending Topics
            </Text>
          </GridItem>
          <GridItem colSpan={4} mt='9px'>
            <Select options={options} value={value} onChange={changeHandler} />
          </GridItem>
          <GridItem colSpan={1} mt='9px' onClick={googleScroll}>
            <Button variant='ghost'>
            <Text fontSize={16} fontFamily={'NunitoSans'} color={'#8d97d7'} fontWeight={600}>
              Google
            </Text>

            </Button>
            
          </GridItem>
          <GridItem colSpan={1} mt='9px' onClick={youtubeScroll}> 
            <Button variant='ghost'>
              <Text fontSize={16} fontFamily={'NunitoSans'} color={'#8d97d7'} fontWeight={600}>
                Youtube
              </Text>
            </Button> 
          </GridItem>

          <GridItem colSpan={1} mt='9px' onClick={twitterScroll}>
            <Button variant='ghost'>
              <Text fontSize={16} fontFamily={'NunitoSans'} color={'#8d97d7'} fontWeight={600}>
                Twitter
              </Text>
            </Button>
          </GridItem>
        </Grid>

        <VStack spacing={20}>
          <Box ref={googleRef} w='80%'>
              <Text fontSize={28} fontFamily={'NunitoSans'} color={'#424242'} fontWeight={600} align='center'>Google</Text>
                <Wrap justify='center'>
                  <Checkbox 
                  isChecked={checkedItemsGoogle[0]} 
                  onChange={() => setCheckedItemsGoolge([!checkedItemsGoogle[0], !checkedItemsGoogle[1]])}>
                    Word Cloud
                  </Checkbox>
                  <Checkbox 
                  isChecked={checkedItemsGoogle[1]}
                  onChange={() => {setCheckedItemsGoolge([!checkedItemsGoogle[0], !checkedItemsGoogle[1]])}}>
                    List View
                  </Checkbox>
                </Wrap> 
                <ViewChangeGoogle isTicked={checkedItemsGoogle[0]} />  
          </Box>

          <Box ref={youtubeRef}>
            <Text fontSize={28} fontFamily={'NunitoSans'} color={'#424242'} fontWeight={600} align='center'>Youtube</Text>
            <YoutubeTrend />
          </Box>

          <Box ref={twitterRef} w='80%' pb='50px'>
            <Text fontSize={28} fontFamily={'NunitoSans'} color={'#424242'} fontWeight={600} align='center'>Twitter</Text>
            <Wrap justify='center'>
                  <Checkbox 
                  isChecked={checkedItemsTwitter[0]} 
                  onChange={() => setCheckedItemsTwitter([!checkedItemsTwitter[0], !checkedItemsTwitter[1]])}>
                    Word Cloud
                  </Checkbox>
                  <Checkbox 
                  isChecked={checkedItemsTwitter[1]} 
                  onChange={() => {setCheckedItemsTwitter([!checkedItemsTwitter[0], !checkedItemsTwitter[1]])}}>
                    List View
                  </Checkbox>
                </Wrap> 
                <ViewChangeTwitter isTicked={checkedItemsTwitter[0]} /> 
          </Box>
        </VStack>
    </ChakraProvider>
  );
}

export default App;
