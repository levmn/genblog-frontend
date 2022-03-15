import React, { useState } from 'react'
import { AppBar, Tab, Tabs, Typography, Box } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import PostList from '../postslist/PostList';
import './PostTab.css';

function PostTab() {

    const [value, setValue] = useState('1')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string){
        setValue(newValue);
    }

  return (
    <>
      <TabContext value={value}>
        <AppBar position="static">
          <Tabs className='bgtab' centered indicatorColor="secondary" onChange={handleChange}>
            <Tab className='titleTab' label="Postagens" value="1"/>
            <Tab className='titleTab' label="Sobre" value="2" />
          </Tabs>
        </AppBar>
        <TabPanel value="1" >
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <PostList/>
          </Box>
        </TabPanel>

        <TabPanel value="2">
          <Box display="flex" flexDirection="row" justifyContent='center' alignItems='center'>
            <Box padding={5}>
              <Typography variant="body1" gutterBottom align="justify" className='aboutme aboutFont'>
                Oi, esse é o insectário, aqui você pode falar sobre bugs (os virtuais e os reais),
                falhas na matrix, experiências sobrenaturais online, nostalgias tecnológicas e afins.
              </Typography>
            </Box>
            <Box>
              <img src="https://imgur.com/vGwDB72.gif" className='aboutimg' alt="obsolete computer" />
            </Box>
          </Box>
        </TabPanel>
      </TabContext>
    </>
  );
}

export default PostTab;