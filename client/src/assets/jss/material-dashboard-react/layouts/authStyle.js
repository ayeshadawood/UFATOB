import {
  drawerWidth,
  transition,
  container,
} from 'assets/jss/material-dashboard-react.js';

const appStyle = (theme) => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
  },
  mainPanel: {
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
  },
  content: {
    marginTop: '150px',
    padding: '30px 15px',
    minHeight: 'calc(100vh - 123px)',
  },
  container,
  map: {
    marginTop: '70px',
  },
  input: {
    marginBottom: '15px',
  },
  heading: {
    color: 'black',
    marginBottom: '40px',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 'bold',
  },
  logo: {
    fontSize: '56px',
    marginBottom: '30px',
  },
});

export default appStyle;
