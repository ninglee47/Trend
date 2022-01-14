import React from 'react';
import { useSelector} from 'react-redux'
import { Box, HStack, Text, Link, List, useStyleConfig } from '@chakra-ui/react';
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
    if (num > 100) {
        num = 100
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
        value = 20
    }else {
        value = props.tags.count
    }
    
    const listItems = props.value.relatedQueries.map((keyword) =>
      // Correct! Key should be specified inside the array.
      <RelatedItems key={keyword.query} value={keyword} />
    );

    return (
     <HStack spacing='100px' mb='10px'>
        <Box w='60%'>
        <Text fontSize={size(value)} fontFamily={'NunitoSans'} color={'#3d4ca4'} fontWeight={'bold'} lineHeight={'105%'}>
          <Link href={url} target='_blank' rel="noreferrer" >{title}</Link>
        </Text>
        
        </Box>
        <Box w='40%'>
        <Text fontSize={21} fontFamily={'NunitoSans'} color={'#202962'}>Traffic: {props.value.formattedTraffic}</Text>
          <Text fontSize={21} fontFamily={'NunitoSans'} color={'#202962'}>Related queries: {listItems}</Text>
        </Box>
    </HStack>);
}

function findTag(keyword,tags) {
    let temp = tags.find(element=> element.value === keyword.title.query)
    return temp
}

function KeyList(props) {
    const keywords = props.value;
    const tags = props.tags;
    console.log(tags)
   
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
    console.log(trend)
    console.log(tags)
    
    if(trend.length === 0 || tags.length === 0) {
        return(
            <div>
                <EmptyDiv />
            </div>
        )
    }

    return(
        <div>
             <KeyList className='card-body' value={trend} tags={tags}/>
        </div>
    );
}