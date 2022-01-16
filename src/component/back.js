<HStack spacing='100px' mb='10px'>
<Box w='60%'>
  <Link href={url} target='_blank' rel="noreferrer">{title}</Link>
</Box>
<Box w='40%'>
  <Text>Tweet volume {props.value.tweet_volume}</Text>
</Box>
</HStack>