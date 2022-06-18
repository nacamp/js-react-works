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
import { useNavigate } from 'react-router';
import { getToken, removeToken } from './components/Token';

export function MainListItems() {
  // TODO: 리다이렉트시 매뉴선택되게 해야 됨
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  // const token = window.sessionStorage.getItem("token");

  return (
    <React.Fragment>
      <ListItemButton selected={selectedIndex === 0} onClick={() => { setSelectedIndex(0); navigate('/') }}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="대쉬보드" />
      </ListItemButton>

      {!getToken() &&
        <>

          <ListItemButton selected={selectedIndex === 2} onClick={() => { setSelectedIndex(2); navigate('/login') }}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="LOGIN" />
          </ListItemButton>
        </>
      }
      {!!getToken() &&
        <>
          <ListItemButton selected={selectedIndex === 1} onClick={() => { setSelectedIndex(1); navigate('/b') }}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="TODO" />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 2} onClick={() => { setSelectedIndex(2); navigate('/routine') }}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="ROUTINE" />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 3} onClick={() => { setSelectedIndex(3); removeToken(); navigate('/login') }}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="LOGOUT" />
          </ListItemButton>
        </>

      }
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