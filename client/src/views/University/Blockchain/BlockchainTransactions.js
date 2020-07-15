import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import Table from '../../../components/Table/Table.js';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardBody from '../../../components/Card/CardBody.js';
import { connect } from 'react-redux';
import { getAllTransactions } from '../../../actions/blockchain';
import Moment from 'react-moment';
import { CircularProgress, TextField } from '@material-ui/core';

import styles from '../../../assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

const Blockchain = ({
  blockchain: { loading, transactions },
  getAllTransactions,
  match,
}) => {
  const classes = useStyles();

  const [description, setDescription] = useState('');

  const getTransactions = () => {
    let res = [];
    let sNo = 1;
    transactions.forEach((transaction) => {
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
            `Rs. ${transaction.amount}`,
            <Moment format='DD-MMM-YYYY'>{transaction.timeStamp}</Moment>,
          ],
        ];
        sNo++;
      }
    });
    return res;
  };

  useEffect(() => {
    getAllTransactions(match.params.id);
  }, [getAllTransactions, match.params.id]);

  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>Blockchain</h4>
              <p className={classes.cardCategoryWhite}>
                Below is a list of all the Smart Contracts in the current chain
              </p>
            </CardHeader>
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
                <CardBody>
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
                      !loading && transactions.length > 0
                        ? getTransactions()
                        : []
                    }
                  />
                </CardBody>
              </Fragment>
            )}
          </Card>
        </GridItem>
      </GridContainer>
    </Fragment>
  );
};

Blockchain.propTypes = {
  blockchain: PropTypes.object.isRequired,
  getAllTransactions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blockchain: state.blockchain,
});

export default connect(mapStateToProps, { getAllTransactions })(Blockchain);
