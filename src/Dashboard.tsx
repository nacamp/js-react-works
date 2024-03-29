import * as React from 'react';
import { useEffect } from 'react';

import {
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  Paper,
  useMediaQuery,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { MenuListItems } from './listItems';
import { Route, Routes } from 'react-router-dom';
import TodoTemplatePage from './pages/TodoTemplate';
import { SignInPage } from './pages/SignIn';
import RoutineTodo from './pages/RoutineTodo';
import CalendarPage from './pages/Calendar';
import LabelPage from './pages/Label';
import Playground from './Playground';
import Future from './pages/Future';
import dayjs from 'dayjs';

// function Copyright(props: any) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      // [theme.breakpoints.up('sm')]: {
      //   width: theme.spacing(9),
      // },
    }),
  },
}));

function DashboardContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(true);
  const [menuName, setMenuName] = React.useState('');
  const toggleDrawer = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);
  function handleMenuClick(name: string) {
    setMenuName(name);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar open={open}>
        {' '}
        {/* position="relative" */}
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {menuName}
          </Typography>
          {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <MenuListItems onClick={handleMenuClick} />
          {/* 
            <Divider sx={{ my: 1 }} />
            {secondaryListItems} */}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Routes>
                  <Route path="/" element={<Playground />} />
                  <Route path="/todos" element={<TodoTemplatePage />} />
                  <Route path="/routine" element={<RoutineTodo />} />
                  <Route path="/login" element={<SignInPage />} />
                  <Route path="/todos/:id" element={<TodoTemplatePage />} />
                  <Route path="/calendar" element={<CalendarPage yearMonth={dayjs().format('YYYYMM')} />} />
                  <Route path="/label" element={<LabelPage />} />
                  <Route path="/future" element={<Future />} />
                  <Route path="/playground" element={<Playground />} />
                  <Route path="/playground/:id" element={<Playground />} />
                  <Route path="" element={<Playground />} />
                </Routes>
                {/* <Orders /> */}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
