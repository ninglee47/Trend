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
import { ChakraProvider, Grid, GridItem, Text, VStack, Box, Checkbox, Stack, Wrap, extendTheme, Center} from '@chakra-ui/react'

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

function ViewChange(prop) {
  const checked = prop.isTicked
  if (checked) {
    return <GoogleCloud />
  } 
    return <GoogleTrend />
}

function App() {
  //Global state
  const trend = useSelector((state) => state.trend.value)
  const dispatch = useDispatch()

  //Local state
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])
  const [view, setView] = useState(true)

  const [checkedItems, setCheckedItems] = React.useState([true, false])
  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

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
  
  const handleViewChange = (e) => {
    setCheckedItems([e.target.checked, e.target.checked])
  }

  return (
    <ChakraProvider theme={theme}>
        <Grid templateColumns='repeat(10, 1fr)' gap={6} mt='56px' mb='40px'>
          <GridItem ml='5px' colSpan={3}>
            <Text fontSize={32} fontWeight={'bold'} fontFamily={'NunitoSans'} color={'#424242'}>
              Exploring Trending Topics
            </Text>
          </GridItem>
          <GridItem colSpan={4} mt='9px'>
            <Select options={options} value={value} onChange={changeHandler} />
          </GridItem>
          <GridItem colSpan={1} mt='15px'>
            <Text fontSize={16} fontFamily={'NunitoSans'} color={'#8d97d7'} fontWeight={600} _hover={{ fontWeight: "bold"}}>
              Google
            </Text>
          </GridItem>
          <GridItem colSpan={1} mt='15px'>
            <Text fontSize={16} fontFamily={'NunitoSans'} color={'#8d97d7'} fontWeight={600} _hover={{ fontWeight: "bold"}}>
              Youtube
            </Text>
          </GridItem>
          <GridItem colSpan={1} mt='15px'>
            <Text fontSize={16} fontFamily={'NunitoSans'} color={'#8d97d7'} fontWeight={600} _hover={{ fontWeight: "bold"}}>
              Twitter
            </Text>
          </GridItem>
        </Grid>

        <VStack spacing={20}>
          <Box>
              <Text fontSize={28} fontFamily={'NunitoSans'} color={'#424242'} fontWeight={600} align='center'>Google</Text>
                <Wrap justify='center'>

                  <Checkbox 
                  
                  isChecked={checkedItems[0]} 
                  onChange={() => setCheckedItems([false, true])}>
                    Word Cloud
                  </Checkbox>

                  <Checkbox 
                  
                  isChecked={checkedItems[1]} 
                  onChange={() => {setCheckedItems([true, false])
                  }}>
                    List View
                  </Checkbox>

                </Wrap> 
                <ViewChange isTicked={checkedItems[0]} />
                <GoogleCloud />
          </Box>

          <Box>
            <Text fontSize={28} fontFamily={'NunitoSans'} color={'#424242'} fontWeight={600} align='center'>Youtube</Text>
            <Wrap justify='center'>
              <Checkbox  defaultChecked >Word Cloud</Checkbox>
              <Checkbox >List View</Checkbox>
            </Wrap>
            <YoutubeTrend />
          </Box>
          <Box>
            <Text fontSize={28} fontFamily={'NunitoSans'} color={'#424242'} fontWeight={600} align='center'>Twitter</Text>
               <Wrap justify='center'>
                  <Checkbox  defaultChecked>Word Cloud</Checkbox>
                  <Checkbox >List View</Checkbox>
                </Wrap>
              <TwitterTrend />
          </Box>
        </VStack>
    </ChakraProvider>
  );
}

export default App;
