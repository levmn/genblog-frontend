import React from 'react';
import {AppBar, Box, Toolbar, IconButton, Typography, Button, Menu, MenuItem} from '@material-ui/core';
import { createStyles, makeStyles, Theme, } from '@material-ui/core/styles';
import BugIcon from '@material-ui/icons/BugReport';
import {Link} from 'react-router-dom';
import './Navbar.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

function Navbar() {
  const classes = useStyles();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
   
   <AppBar position="static" className="bg">
      <Toolbar variant="dense" className="bar">
         
        <Box>
          <Typography variant="h6">
            BlogPessoal
          </Typography>
        </Box>

        <Box display="flex">
                    <Box className='m'>
                      <Link to="/home" className="text-decorator-none">
                        <Button color="inherit" style={{color: 'white'}}>home</Button>
                      </Link>
                    </Box>
                    <Box className='m'>
                        <Button color="inherit">postagens</Button>
                    </Box>
                    <Box className='m'>
                        <Button color="inherit">temas</Button>
                    </Box>
                    <Box className='m'>
                        <Button color="inherit">cadastrar temas</Button>
                    </Box>
            </Box>

          {auth && (
            <Box>
              <IconButton 
              aria-label="account of current user" 
              aria-controls="menu-appbar" 
              aria-haspopup="true" onClick={handleMenu} 
              color="inherit">
                    <BugIcon style={{ fontSize: 30 }}/>
              </IconButton>
              <Menu 
              id="menu-appbar" 
              anchorEl={anchorEl} 
              anchorOrigin={{ vertical: 'top', horizontal: 'right', }} keepMounted 
              transformOrigin={{ vertical: 'top', horizontal: 'right', }} 
              open={open} onClose={handleClose}>
                <Link to="/login" className="text-decorator-none">
                    <MenuItem onClick={handleClose} style={{color: '#000000'}}>Logout</MenuItem>  
                </Link>            
              </Menu>
            </Box>            
          )}

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;