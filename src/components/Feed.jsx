import React from 'react'
import { useState,useEffect } from 'react'
import { Box,Stack,Typography } from '@mui/material'
import Sidebar from './Sidebar'
import Videos from './Videos'
import { fetchFromAPI } from '../utils/fetchFromAPI'

const Feed = () => {

  const [selectedCategory,setselectedCategory]=useState('NEW');
  const [videos, setVideos] = useState([]);

  useEffect(()=>{
    console.log('Making API request...');
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => {
        console.log('API request successful:', data);
        setVideos(data.items);
        console.log('Videos state updated:', videos);
      })
      .catch((error) => {
        console.error('API request failed:', error);
      });
  },[selectedCategory]);

  return (
    <Stack sx={{flexDirection:{sx:"column",md: "row"}}}>
        <Box sx={{height:{sx:'auto',md:'92vh'},borderRight:'1px solid #3d3d3d',px:{sx:0,md:2}}}>
           <Sidebar selectedCategory={selectedCategory} setselectedCategory={setselectedCategory}>
            
           </Sidebar>
           <Typography className="copyright" variant='body2' sx={{mt:1.5,color:'#fff'}}>
            © All rights reserved
           </Typography>
        </Box>
        <Box sx={{overflowY:'auto',height:'90vh',flex:2}}>
          <Typography variant='h4'fontWeight='bold' mb={2} sx={{color:'white'}}>
                {selectedCategory}<span style={{color:'#F31503'}}>video</span>
          </Typography>
          <Videos videos={videos}/>
        </Box>

    </Stack>
  )
}

export default Feed
