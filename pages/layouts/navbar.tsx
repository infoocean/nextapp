import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';

const Navbar = () => {
    const route = useRouter()
    const [loginuser, setLoginUser] = useState()
    const [loginUserImg, setLoginUserImg] = useState();
    const [pageArray, setPageArray] = useState([])





    const accountFn = async () => {
     route.push('/')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static"  style={{backgroundColor: 'white' ,color:'black',}}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                            CMS
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            
                        </Box>
                        <Typography color="black">
                           
                               
                                 <Button sx={{ color: '#3f51b5' }} onClick={() => { accountFn() }}>
                                    Account
                                </Button>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </Box>
    )
}

export default Navbar