import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import ChannelCard from './ChannelCard'
import Videos from './Videos'
import { fetchFromAPI } from '../utils/fetchFromAPI'

const ChannelDetail = () => {
  const {id}=useParams();
  const [channelDetail,setchannelDetail]=useState(null)
  const [videos,setVideo] = useState([])
   console.log(channelDetail,videos)
  useEffect(()=>{
   
    fetchFromAPI(`channels?part=snippet&id=${id}`)
    .then((data)=>setchannelDetail(data?.items[0]))

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((data)=>setVideo(data?.items))

  },[id])

  return (
   <Box minHeight='95vh'>
    <Box>
      <div style={{background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(206,3,184,1) 35%, rgba(0,212,255,1) 100%)',zIndex:10,height:'300px'}}>
        
        </div>
        <ChannelCard channelDetail={channelDetail} marginTop='-115px'/>
    </Box>
    <Box display="flex" p='2'>
      <Box sx={{mr:{sm:'100px'}}}/>
          <Videos videos={videos} />
     
    </Box>

   </Box>
  )
}

export default ChannelDetail
