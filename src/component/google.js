import React from 'react';
import { useSelector} from 'react-redux'
import { Box, HStack, Stack, Text, Link, List, Center, Divider } from '@chakra-ui/react';
import EmptyDiv from './empty';

function RelatedItems(props) {
    // Correct! There is no need to specify the key here:
    const title = props.value.query
    const domian = "https://trends.google.com"
    const url =  domian + props.value.exploreLink
    
    return (
        <Link href={url} target='_blank' rel="noreferrer">{title} </Link>
    )
}

function size(traffic) {
    //console.log(traffic)
    var num = traffic*3
    if (num > 80) {
        num = 80
    }else if (num < 20) {
        num = 21
    }
    return num
}

function Items(props) {
    // Correct! There is no need to specify the key here:
    const title = props.value.title.query
    const url =  props.value.shareUrl
    //console.log(props.tags)
    var value = 0
    if (typeof(props.tags) == 'undefined') {
        value = 21
    }else {
        value = props.tags.count
    }
    
    const listItems = props.value.relatedQueries.map((keyword) =>
      // Correct! Key should be specified inside the array.
      <RelatedItems key={keyword.query} value={keyword} />
    );

    return (
    <Box>
    
     <HStack spacing='100px' mb='20px'>
        <Center w='60%'>
        <Text fontSize={size(value)} fontFamily={'NunitoSans'} color={'#5b92ed'} fontWeight={'bold'} lineHeight={'105%'} align={'center'}>
          <Link href={url} target='_blank' rel="noreferrer" >{title}</Link>
        </Text>
        
        </Center>
        <Box w='40%'>
        <HStack pb='10px'>
          <Text fontSize={21} fontFamily={'NunitoSans'} color={'#424242'} fontWeight={'bold'}>Traffic</Text>
          <Text fontSize={21} fontFamily={'NunitoSans'} color={'#424242'}>{props.value.formattedTraffic}</Text>
        </HStack>
        <Stack justifyContent={'left'}> 
          <Text fontSize={21} fontFamily={'NunitoSans'} color={'#424242'} fontWeight={'bold'} >Related queries </Text>
          <Text fontSize={21} fontFamily={'NunitoSans'} color={'#424242'}>{listItems}</Text>
        </Stack>
          
        </Box>
    </HStack>
    <Divider mb={'10px'} borderWidth={'1px'}/>
    </Box>);
}

function findTag(keyword,tags) {
    let temp = tags.find(element=> element.value === keyword.title.query)
    return temp
}

function KeyList(props) {
    const keywords = props.value;
    const tags = props.tags;
    //console.log(tags)
   
    const listItems = keywords.map((keyword, index) =>
      // Correct! Key should be specified inside the array.
      <Items key={index} value={keyword} tags={findTag(keyword, tags)}/>
    );

    return (
      <List>
        {listItems}
      </List>
    );
}

export default function GoogleTrend() {
    const trend = useSelector((state) => state.trend.valueGoogle)
    const tags = useSelector((state) => state.trend.tagData)
    //console.log(trend)
    //console.log(tags)
    
    if(trend.length === 0 || tags.length === 0) {
        return(
            <div>
                <EmptyDiv />
            </div>
        )
    }

    return(
        <div>
             <KeyList value={trend} tags={tags}/>
        </div>
    );
}