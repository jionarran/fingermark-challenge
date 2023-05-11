import { Box, Toolbar, Typography, Menu, Tooltip, IconButton, Avatar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStore } from "react-icons/fa"

export function Header() {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar style={{ backgroundColor: '#FFFFFF' }} position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <FaStore color='#ccc' style={{ width: "5vh", height: "3vh" }}/>
          <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                fontWeight: 900,
                color: '#ccc',
                ml: 3
              }}
            >
              {'Kiosk Management'}
            </Typography>
          </div>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="J"/>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
  )
}