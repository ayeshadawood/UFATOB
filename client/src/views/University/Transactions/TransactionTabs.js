import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '../../../components/Table/Table.js';
import { connect } from 'react-redux';
import { getAllTransactionsForUser } from '../../../actions/blockchain';
import Moment from 'react-moment';
import { CircularProgress, TextField } from '@material-ui/core';

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

const TransactionTabs = ({
  blockchain: { userTransactions, loading },
  getAllTransactionsForUser,
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

  const [description, setDescription] = useState('');

  const getPendingTransactions = () => {
    let res = [];
    let sNo = 1;
    userTransactions.forEach((transaction) => {
      if (transaction.status === 0) {
        if (
          description === '' ||
          new RegExp(description, 'i').test(transaction.title) ||
          new RegExp(description, 'i').test(transaction.sender.name) ||
          new RegExp(description, 'i').test(transaction.reciever) ||
          new RegExp(description, 'i').test(transaction.amount)
        ) {
          res = [
            ...res,
            [
              sNo,
              transaction.title,
              transaction.sender.name,
              transaction.reciever,
              `Rs.${transaction.amount}`,
              <Moment format='DD-MMM-YYYY'>{transaction.timeStamp}</Moment>,
            ],
          ];
          sNo++;
        }
      }
    });
    return res;
  };

  const getVerifiedTransactions = () => {
    let res = [];
    let sNo = 1;
    userTransactions.forEach((transaction) => {
      if (transaction.status === 1) {
        if (
          description === '' ||
          new RegExp(description, 'i').test(transaction.title) ||
          new RegExp(description, 'i').test(transaction.sender.name) ||
          new RegExp(description, 'i').test(transaction.reciever) ||
          new RegExp(description, 'i').test(transaction.amount)
        ) {
          res = [
            ...res,
            [
              sNo,
              transaction.title,
              transaction.sender.name,
              transaction.reciever,
              `Rs.${transaction.amount}`,
              <Moment format='DD-MMM-YYYY'>{transaction.timeStamp}</Moment>,
            ],
          ];
          sNo++;
        }
      }
    });
    return res;
  };

  useEffect(() => {
    getAllTransactionsForUser();
  }, [getAllTransactionsForUser]);

  return (
    <Fragment>
      <div className={classes.root}>
        {loading ? (
          <div
            style={{
              textAlign: 'center',
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Fragment>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label='Search'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
              style={{ marginBottom: '20px' }}
            />
            <AppBar position='static' color='default'>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor='primary'
                textColor='primary'
                variant='fullWidth'
                aria-label='full width tabs example'
              >
                <Tab label='Pending' {...a11yProps(0)} />
                <Tab label='Verified' {...a11yProps(1)} />
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
                  tableHead={[
                    'S.No.',
                    'Title',
                    'Sender',
                    'Reciever',
                    'Amount',
                    'Created at',
                  ]}
                  tableData={
                    !loading && userTransactions.length > 0
                      ? getPendingTransactions()
                      : []
                  }
                />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Table
                  tableHeaderColor='primary'
                  tableHead={[
                    'S.No.',
                    'Title',
                    'Sender',
                    'Reciever',
                    'Amount',
                    'Created at',
                  ]}
                  tableData={
                    !loading && userTransactions.length > 0
                      ? getVerifiedTransactions()
                      : []
                  }
                />
              </TabPanel>
            </SwipeableViews>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

TransactionTabs.propTypes = {
  blockchain: PropTypes.object.isRequired,
  getAllTransactionsForUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blockchain: state.blockchain,
});

export default connect(mapStateToProps, {
  getAllTransactionsForUser,
})(TransactionTabs);
