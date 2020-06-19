import {
  drawerWidth,
  transition,
  container,
} from '../../material-dashboard-react.js';

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
    marginTop: '50px',
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
  noticeboard: {
    backgroundColor: 'white',
    border: '10px solid #d4e0e1',
    borderRadius: '15px',
    marginTop: '30px !important',
    height: '400px',
    overflowY: 'scroll',
    padding: '20px 10px',
    marginRight: '10px !important',
  },
  headingNoticeboard: {
    fontSize: '36px',
    fontWeight: '700',
    textDecoration: 'underline',
    textAlign: 'center',
    marginBottom: '20px',
  },
  importantHeading: {
    color: '#16697a',
    fontSize: '28px',
    fontWeight: '700',
    textDecoration: 'underline 3px',
    marginBottom: '20px',
    width: '100%',
    float: 'left',
  },
  title: {
    color: '#5e5e5e',
    fontSize: '24px',
    fontWeight: '500',
    width: '100%',
    float: 'left',
    marginBottom: '5px',
  },
  desc: {
    color: '#77867f',
    fontSize: '16px',
    fontWeight: '300',
    width: '100%',
    height: '50px',
    float: 'left',
    overflow: 'hidden',
    marginBottom: '10px',
    marginTop: '0 !important',
  },
  login: {
    backgroundColor: 'white',
    border: '10px solid #d4e0e1',
    borderRadius: '15px',
    marginTop: '30px !important',
    height: '400px',
    overflowY: 'scroll',
    padding: '20px 10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default appStyle;
