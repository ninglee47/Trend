import { List,Link,Box, Text, HStack } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux'
import EmptyDiv from './empty';

function size(volume) {
    //console.log(volume)
    var num = volume/1000
    if (num > 100) {
        num = 80
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
            <HStack spacing='100px' mb='10px'>
              <Box w='60%'>
                  <Text fontSize={20} fontFamily={'NunitoSans'} color={'#50c5f2'} fontWeight={'bold'} lineHeight={'105%'}>
                    <Link href={url} target='_blank' rel="noreferrer">{title}</Link>
                  </Text>
              </Box>
              <Box w='40%'>
                <Text fontSize={21} fontFamily={'NunitoSans'} color={'#202962'}>Tweet volume: N/A</Text>
              </Box>
            </HStack>
        )
    } else {
        return (
            <HStack spacing='100px' mb='10px'>
              <Box w='60%'>
                  <Text fontSize={size(props.value.tweet_volume)} fontFamily={'NunitoSans'} color={'#50c5f2'} fontWeight={'bold'} lineHeight={'105%'}>
                    <Link href={url} target='_blank' rel="noreferrer">{title}</Link>
                  </Text>
              </Box>
              <Box w='40%'>
                <Text fontSize={21} fontFamily={'NunitoSans'} color={'#202962'}>Tweet volume: {props.value.tweet_volume}</Text>
              </Box>
            </HStack>
        )
    }
}

function HashtagList(props) {
    const hashtags = props.value[0].trends;
    //console.log(hashtags)
    
    const listItems = hashtags.map((hashtag) =>
      // Correct! Key should be specified inside the array.
      <Item key={hashtag.name} value={hashtag} />
    );
    return (
      <List className='list-group list-group-flush'>
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