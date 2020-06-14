import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import Table from 'components/Table/Table.js';
import { connect } from 'react-redux';
import {
  getUniversityComplaints,
  forwardComplaint,
} from '../../../actions/complaint';
import { Link } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Fragment>
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    </Fragment>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const ComplaintTabs = ({
  complaint: { complaints, loading },
  getUniversityComplaints,
  forwardComplaint,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const getQueuedComplaints = () => {
    let res = [];
    let sNo = 1;
    complaints.forEach((complaint) => {
      if (complaint.status === 0) {
        res = [
          ...res,
          [
            sNo,
            complaint.title,
            <Fragment>
              <Link to={`/university/complaint/${complaint._id}`}>
                <Button color='primary' variant='contained'>
                  Open
                </Button>
              </Link>
              <Button
                color='primary'
                variant='contained'
                onClick={() => forwardComplaint(complaint._id)}
                style={{ backgroundColor: 'green', marginLeft: '5px' }}
              >
                Forward
              </Button>
            </Fragment>,
          ],
        ];
      }
      sNo++;
    });
    return res;
  };

  const getForwardedComplaints = () => {
    let res = [];
    let sNo = 1;
    complaints.forEach((complaint) => {
      if (complaint.status === 1) {
        res = [
          ...res,
          [
            sNo,
            complaint.title,
            <Link to={`/university/complaint/${complaint._id}`}>
              <Button color='primary' variant='contained'>
                Open
              </Button>
              ,
            </Link>,
          ],
        ];
      }
      sNo++;
    });
    return res;
  };

  const getConsideredComplaints = () => {
    let res = [];
    let sNo = 1;
    complaints.forEach((complaint) => {
      if (complaint.status === 2) {
        res = [
          ...res,
          [
            sNo,
            complaint.title,
            <Link to={`/university/complaint/${complaint._id}`}>
              <Button color='primary' variant='contained'>
                Open
              </Button>
              ,
            </Link>,
          ],
        ];
      }
      sNo++;
    });
    return res;
  };

  const getNotConsideredComplaints = () => {
    let res = [];
    let sNo = 1;
    complaints.forEach((complaint) => {
      if (complaint.status === 3) {
        res = [
          ...res,
          [
            sNo,
            complaint.title,
            <Link to={`/university/complaint/${complaint._id}`}>
              <Button color='primary' variant='contained'>
                Open
              </Button>
              ,
            </Link>,
          ],
        ];
      }
      sNo++;
    });
    return res;
  };

  useEffect(() => {
    getUniversityComplaints();
  }, [getUniversityComplaints]);

  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar position='static' color='default'>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
            aria-label='full width tabs example'
          >
            <Tab label='Queue' {...a11yProps(0)} />
            <Tab label='Forwarded' {...a11yProps(1)} />
            <Tab label='Considered' {...a11yProps(2)} />
            <Tab label='Not considered' {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Table
              tableHeaderColor='primary'
              tableHead={['S.No.', 'Title', 'Actions']}
              tableData={
                !loading && complaints.length > 0 ? getQueuedComplaints() : []
              }
            />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Table
              tableHeaderColor='primary'
              tableHead={['S.No.', 'Title', 'Actions']}
              tableData={
                !loading && complaints.length > 0
                  ? getForwardedComplaints()
                  : []
              }
            />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Table
              tableHeaderColor='primary'
              tableHead={['S.No.', 'Title', 'Actions']}
              tableData={
                !loading && complaints.length > 0
                  ? getConsideredComplaints()
                  : []
              }
            />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <Table
              tableHeaderColor='primary'
              tableHead={['S.No.', 'Title', 'Actions']}
              tableData={
                !loading && complaints.length > 0
                  ? getNotConsideredComplaints()
                  : []
              }
            />
          </TabPanel>
        </SwipeableViews>
      </div>
    </Fragment>
  );
};

ComplaintTabs.propTypes = {
  complaint: PropTypes.object.isRequired,
  getUniversityComplaints: PropTypes.func.isRequired,
  forwardComplaint: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  complaint: state.complaint,
});

export default connect(mapStateToProps, {
  getUniversityComplaints,
  forwardComplaint,
})(ComplaintTabs);
