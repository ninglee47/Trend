import './App.css';
import GoogleTrend from './component/google'
import YoutubeTrend from './component/youtube';
import TwitterTrend from './component/twitter';
import GoogleCloud from './component/googleCloud';
import TwitterCloud from './component/twitterCloud';
import React, { useState, useMemo, useRef} from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { updateGoogleTrend, updateYoutubeTrend, updateTwitterTrend, updateTagData, updateTwitterTagData } from './redux/trendSlice';
import { useDispatch } from 'react-redux'
import { ChakraProvider, Grid, GridItem, Text, VStack, Box, Checkbox, Wrap, extendTheme, Button} from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    checkbox: {
      blue: {
        100:"#b0bad4",
        200:"#8593ba",
        300:"#5B6D9E",
        400:"#435178",
        500:"#374365",
        600:"#22293e"
      },
      box: {
        500: "#5B6D9E"
      }
    }
  }
})

async function getTrend(country) {
  var option = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://trend-server.herokuapp.com/'
    },
    body: JSON.stringify(country)
  }

  var res = await fetch("https://trend-server.herokuapp.com/trend", option)
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
      elm.count = parseInt(num)
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

function App() {
  //Global state
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

//Switch view button (Google)
const ViewChangeGoogle = (prop)=>{
    const checked = prop.isTicked
  if (checked) {
    return <GoogleCloud />
    } else {
    return <GoogleTrend />
    }
  }

  //Switch view button (Twitter)
  const ViewChangeTwitter = (prop)=> {
    const checked = prop.isTicked
    if (checked) {
      return <TwitterCloud />
    } else {
      return <TwitterTrend />
    }
  }
  
  
  return (
    <ChakraProvider theme={theme}>
        <Grid templateColumns='repeat(10, 1fr)' gap={6} mt='56px' mb='40px' ml='50px' mr='50px'>

          <GridItem ml='8px' colSpan={3} rowStart={{ base: '1', sm: '1' }}>
            <Text align={'center'} fontSize={{ base: '20', sm: '25', md:'40' }} fontWeight={'bold'} fontFamily={'NunitoSans'} color={'#424242'}>
              Trending Topics
            </Text>
          </GridItem>
          
          <GridItem colSpan={4} mt='9px' rowStart={{ base: '2', sm: '1' }}>
            <Select options={options} value={value} onChange={changeHandler} />
          </GridItem>

          <GridItem colSpan={1} mt='9px' onClick={googleScroll} rowStart={{ base: '3', sm: '1' }}>
            <Button variant='ghost'>
            <Text fontSize={16} fontFamily={'NunitoSans'} color={'#5b6d9e'} fontWeight={600}>
              Google
            </Text>
            </Button>
          </GridItem>

          <GridItem colSpan={1} mt='9px' onClick={twitterScroll} rowStart={{ base: '3', sm: '1' }}>
            <Button variant='ghost'>
              <Text fontSize={16} fontFamily={'NunitoSans'} color={'#5b6d9e'} fontWeight={600}>
                Twitter
              </Text>
            </Button>
          </GridItem>

          <GridItem colSpan={1} mt='9px' onClick={youtubeScroll} rowStart={{ base: '3', sm: '1' }}> 
            <Button variant='ghost'>
              <Text fontSize={16} fontFamily={'NunitoSans'} color={'#5b6d9e'} fontWeight={600}>
                Youtube
              </Text>
            </Button> 
          </GridItem>

        </Grid>

        <VStack spacing={20}>
          <Box ref={googleRef} w='80%'>
              <Text fontSize={28} fontFamily={'NunitoSans'} color={'#424242'} fontWeight={600} align='center'>Google</Text>
                <Wrap justify='center' mb='10px'>
                  <Checkbox 
                  colorScheme='checkbox.box'
                  isChecked={checkedItemsGoogle[0]} 
                  onChange={() => setCheckedItemsGoolge([!checkedItemsGoogle[0], !checkedItemsGoogle[1]])}>
                    Word Cloud
                  </Checkbox>
                  <Checkbox 
                  colorScheme='checkbox.box'
                  isChecked={checkedItemsGoogle[1]}
                  onChange={() => {setCheckedItemsGoolge([!checkedItemsGoogle[0], !checkedItemsGoogle[1]])}}>
                    List View
                  </Checkbox>
                </Wrap> 
                <ViewChangeGoogle isTicked={checkedItemsGoogle[0]} />  
          </Box>

          <Box ref={twitterRef} w='80%' pb='20px'>
            <Text fontSize={28} fontFamily={'NunitoSans'} color={'#424242'} fontWeight={600} align='center'>Twitter</Text>
            <Wrap justify='center' mb='10px'>
                  <Checkbox 
                  colorScheme='checkbox.box'
                  isChecked={checkedItemsTwitter[0]} 
                  onChange={() => setCheckedItemsTwitter([!checkedItemsTwitter[0], !checkedItemsTwitter[1]])}>
                    Word Cloud
                  </Checkbox>
                  <Checkbox 
                  colorScheme='checkbox.box'
                  isChecked={checkedItemsTwitter[1]} 
                  onChange={() => {setCheckedItemsTwitter([!checkedItemsTwitter[0], !checkedItemsTwitter[1]])}}>
                    List View
                  </Checkbox>
                </Wrap> 
                <ViewChangeTwitter isTicked={checkedItemsTwitter[0]} /> 
          </Box>

          <Box ref={youtubeRef}>
            <Text fontSize={28} fontFamily={'NunitoSans'} color={'#424242'} fontWeight={600} align='center' mb={'20px'}>Youtube</Text>
            <YoutubeTrend />
          </Box>

        </VStack>
    </ChakraProvider>
  );
}

export default App;
