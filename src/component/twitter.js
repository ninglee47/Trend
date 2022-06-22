import { List,Link,Box, Text, HStack, Center, Divider } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux'
import EmptyDiv from './empty';

function size(volume) {
    //console.log(volume)
    var num = volume/1000
    if (num > 75) {
        num = 75
    }else if (num < 20) {
        num = 21
    }
    return num
}


function Item(props) {
    // Correct! There is no need to specify the key here:
    const title = props.value.name
    const url =  props.value.url
    
    if (props.value.tweet_volume == null) {
        return (
          <Box>
            <HStack spacing='10px' mb='15px'>
              <Center w='60%'>
                  <Text fontSize={20} fontFamily={'NunitoSans'} color={'#50c5f2'} fontWeight={'bold'} lineHeight={'105%'}
                  align={'center'}>
                    <Link href={url} target='_blank' rel="noreferrer">{title}</Link>
                  </Text>
              </Center>
              <Box w='40%'>
              <HStack>
                  <Text fontSize={21} fontFamily={'NunitoSans'} color={'#424242'} fontWeight={'bold'}>Tweet volume: {props.value.tweet_volume}</Text>
                  <Text fontSize={21} fontFamily={'NunitoSans'} color={'#424242'}>N/A</Text>
                </HStack>
              </Box>
            </HStack>
            <Divider mb={'10px'} borderWidth={'1px'}/>
          </Box>
        )
    } else {
        return (
          <Box>
            <HStack spacing='10px' mb='15px'>
              <Box w='60%'>
                  <Text fontSize={size(props.value.tweet_volume)} 
                  fontFamily={'NunitoSans'} color={'#50c5f2'} fontWeight={'bold'} lineHeight={'105%'}
                  align={'center'}>
                    <Link href={url} target='_blank' rel="noreferrer">{title}</Link>
                  </Text>
              </Box>
              <Box w='40%'>
                <HStack>
                  <Text fontSize={21} fontFamily={'NunitoSans'} color={'#424242'} fontWeight={'bold'}>Tweet volume: </Text>
                  <Text fontSize={21} fontFamily={'NunitoSans'} color={'#424242'}>{props.value.tweet_volume}</Text>
                </HStack>
                
              </Box>
            </HStack>
            <Divider mb={'10px'} borderWidth={'1px'}/>
            </Box>
        )
    }
}

function HashtagList(props) {
    const hashtags = props.value[0].trends;
    //console.log(hashtags)
    let arrayForSort = [...hashtags]
    arrayForSort.sort((a, b) => b.tweet_volume - a.tweet_volume);
    //console.log("sorted", arrayForSort)
    const listItems = arrayForSort.map((hashtag) =>
      // Correct! Key should be specified inside the array.
      <Item key={hashtag.name} value={hashtag} />
    );
    return (
      <List >
        {listItems}
      </List>
    );
}


export default function TwitterTrend() {
    const trend = useSelector((state) => state.trend.valueTwitter)
    //console.log(trend)
    if(trend.length === 0) {
        return(
            <div>
                <EmptyDiv />
            </div>
        )
    }

    return (
        <div>
            <HashtagList value={trend} />
        </div>
    )
}