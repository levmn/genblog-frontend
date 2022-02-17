import React from 'react'
import {AppBar, Box, Toolbar, IconButton, Typography, Button} from '@material-ui/core';
import BugIcon from '@material-ui/icons/BugReport';
import './Navbar.css';

function Navbar() {
  return (
    <>
        <AppBar position="static" className="bg">
            <Toolbar variant="dense">
                <Box>
                    <IconButton edge="start" color="inherit" aria-label="login">
                        <BugIcon style={{ fontSize: 30 }} />
                    </IconButton>
                </Box>

                <Box>
                    <Typography variant="h6">
                        BlogPessoal
                    </Typography>
                </Box>

                <Box display="flex">
                    <Box>
                        <Button color="inherit">home</Button>
                    </Box>
                    <Box>
                        <Button color="inherit">postagens</Button>
                    </Box>
                    <Box>
                        <Button color="inherit">temas</Button>
                    </Box>
                    <Box>
                        <Button color="inherit">cadastrar temas</Button>
                    </Box>

                    <Box>
                        <Button color="inherit">login</Button>
                    </Box>
                    <Box>
                        <Button color="inherit">logout</Button>
                    </Box>
                </Box>

            </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar;