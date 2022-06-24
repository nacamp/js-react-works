import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Link from '@mui/material/Link';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { useNavigate, useLocation } from 'react-router';
import { getToken, removeToken } from './components/Token';

type IMenuListItems = {
  onClick: (text: string) => void;
}
export function MenuListItems({onClick}:IMenuListItems) {
  const navigate = useNavigate();
  let location = useLocation();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  // const token = window.sessionStorage.getItem("token");

  React.useEffect(() => {
    console.log(location.pathname);
    if(location.pathname === '/todos'){
      console.log('here');
      setSelectedIndex(1);
      onClick('Today');
    }
  }, [location]);

  return (
    <React.Fragment>
      {!getToken() &&
        <>
          <ListItemButton selected={true} onClick={() => { setSelectedIndex(2); onClick('Login');  navigate('/login') }}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItemButton>
        </>
      }
      {!!getToken() &&
        <>
          <ListItemButton selected={selectedIndex === 1} onClick={() => { setSelectedIndex(1); onClick('Today'); navigate('/todos') }}>
            <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary="Today" />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 2} onClick={() => { setSelectedIndex(2);  onClick('Routine'); navigate('/routine') }}>
            <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary="Routine" />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 4} onClick={() => { setSelectedIndex(4);  onClick('Future'); navigate('/todos/20000101') }}>
            <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary="Future" />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 5} onClick={() => { setSelectedIndex(5);  onClick('Calendar'); navigate('/calendar') }}>
            <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 6} onClick={() => { setSelectedIndex(6);  onClick('Label'); navigate('/label') }}>
            <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary="Label" />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 7} onClick={() => { setSelectedIndex(1);  onClick('Login'); removeToken(); navigate('/login') }}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 8} onClick={() => { setSelectedIndex(8);  onClick('Playground'); navigate('/playground') }}>
            <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary="Playground" />
          </ListItemButton>
        </>

      }
      {/* <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItemButton> */}
    </React.Fragment>
  )
};
export const mainListItems2 = (
  <React.Fragment>
    <ListItemButton component={Link}  >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="대쉬보드" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);