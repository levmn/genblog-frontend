import React from 'react';
import {AppBar, Box, Toolbar, IconButton, Typography, Button, Menu, MenuItem} from '@material-ui/core';
import { createStyles, makeStyles, Theme, } from '@material-ui/core/styles';
import BugIcon from '@material-ui/icons/BugReport';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../../../store/tokens/userReducer';
import { addToken } from '../../../store/tokens/actions';
import { toast } from 'react-toastify';
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
  
  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );
  let history = useHistory();
  const dispatch = useDispatch();

  function goLogout(){
    dispatch(addToken(''));
    toast.info("Usuário deslogado.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
      progress: undefined,
    });
    history.push('/login')
  }

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

  var navbarComponent;

  if(token !== ""){
    navbarComponent = <div className={classes.root}>
   
    <AppBar position="static" className='bg'>
       <Toolbar variant="dense" className='bar'>
          
         <Box>
         <Link to="/home" className='text-decorator-none'>
             <Typography variant="h6" className='titulo font'>
               Insectario
             </Typography>
         </Link>
         </Box>
 
         <Box display="flex">
                     <Box className='m'>
                       <Link to="/home" className='text-decorator-none text-color'>
                         <Button color="inherit" style={{color: 'white'}} className='fontNav bold'>home</Button>
                       </Link>
                     </Box>
                     
                     <Box className='m'>
                       <Link to='/postagens' className='text-decorator-none text-color'>
                           <Button color="inherit" className='fontNav bold'>postagens</Button>
                       </Link>
                     </Box>
                     
                     <Box className='m'>
                       <Link to='/temas' className='text-decorator-none text-color'>
                           <Button color="inherit" className='fontNav bold'>temas</Button>
                       </Link>
                     </Box>
 
                     <Box className='m'>
                       <Link to='/formulariotema' className='text-decorator-none text-color'>
                           <Button color="inherit" className='fontNav bold'>cadastrar temas</Button>
                       </Link>
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
 
                 <MenuItem onClick={goLogout} style={{color: '#000000'}} className='fontNav'>Logout</MenuItem>  
 
               </Menu>
             </Box>            
           )}
 
         </Toolbar>
       </AppBar>
     </div>
  }
  return (
    <>
      { navbarComponent }
    </>
  );
}

export default Navbar;