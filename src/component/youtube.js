import { Box, HStack, Image, Link, Text, VStack, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { useSelector} from 'react-redux'
import EmptyDiv from './empty';

function ListItem(props) {
    //console.log(props.value)
    const title = props.value.snippet.title
    const url =  "https://www.youtube.com/watch?v=" + props.value.id
    const channel = "https://www.youtube.com/channel/" + props.value.snippet.channelId
    return <Box pb={'10px'} >
      <Grid templateColumns='repeat(10, 1fr)' gap={1}>

        <GridItem colSpan={{ base: '7', sm: '3' }}  colStart={{ base: '3', sm: '2' }} rowStart={{ base: '1', sm: '1' }} pr={'10px'}>
          <Image src={props.value.snippet.thumbnails.medium.url} alt={title}/>
        </GridItem>
          
        <GridItem colSpan={6} colStart={{ base: '3', sm: '5' }} rowStart={{ base: '2', sm: '1' }}>
          <VStack alignItems={'left'}>
            <Text pt={{ base: '5px', sm: '20px' }} maxW={'lg'} fontFamily={'NunitoSans'} color={'#424242'} isTruncated fontWeight={'bold'}>
              <Link href={url} target='_blank' rel="noreferrer">{title}</Link>
            </Text>
          
              <Box>
                <HStack>
                  <Text fontFamily={'NunitoSans'} color={'#424242'} fontWeight={'bold'}>
                  Channel: 
                  </Text>
                  <Text fontFamily={'NunitoSans'} color={'#424242'} isTruncated>
                    <Link href={channel} target='_blank' rel="noreferrer">
                     {props.value.snippet.channelTitle}
                    </Link>
                  </Text>
                </HStack>
              </Box>
              <Box>
                  <HStack>
                  <Text fontFamily={'NunitoSans'} color={'#424242'} fontWeight={'bold'}>
                    Views: 
                  </Text> 
                    <Text fontFamily={'NunitoSans'} color={'#424242'} >
                      {props.value.statistics.viewCount}
                    </Text> 
                  </HStack>
              </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
}

function VideoList(props) {
    const videos = props.value;
    const listItems = videos.map((video) =>
      <ListItem key={video.id} value={video} />
    );
    return (
      <div>
        {listItems}
      </div>
    );
}


export default function YoutubeTrend() {
    const trend = useSelector((state) => state.trend.valueYoutube)
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
            <VideoList value={trend} />
        </div>
    )
}