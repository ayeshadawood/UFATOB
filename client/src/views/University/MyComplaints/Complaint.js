import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardBody from '../../../components/Card/CardBody.js';
import { connect } from 'react-redux';
import { getComplaint } from '../../../actions/complaint';
import { CircularProgress } from '@material-ui/core';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  row: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
};

const useStyles = makeStyles(styles);

const Complaint = ({
  complaint: { complaint, loading },
  getComplaint,
  match,
}) => {
  const classes = useStyles();

  const getComplaintStatus = (status) => {
    switch (status) {
      case 0:
        return 'Forwarded to University';
      case 1:
        return 'Forwarded to HEC';
      case 2:
        return 'Considered';
      case 3:
        return 'Not considered';
      default:
        return '';
    }
  };

  useEffect(() => {
    getComplaint(match.params.id);
  }, [getComplaint, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
        <Fragment>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color='primary'>
                  <h4 className={classes.cardTitleWhite}>Complaint</h4>
                  <p className={classes.cardCategoryWhite}>
                    Below is the detail of the complaint
                  </p>
                </CardHeader>
                <CardBody>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className={classes.row}>
                      <strong>Title:</strong>{' '}
                      {!loading && complaint !== null ? complaint.title : ''}
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className={classes.row}>
                      <strong>Name:</strong>{' '}
                      {!loading && complaint !== null ? complaint.name : ''}
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className={classes.row}>
                      <strong>Email:</strong>{' '}
                      {!loading && complaint !== null ? complaint.email : ''}
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className={classes.row}>
                      <strong>Contact no:</strong>{' '}
                      {!loading && complaint !== null
                        ? complaint.contactNo
                        : ''}
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className={classes.row}>
                      {!loading &&
                      complaint !== null &&
                      complaint.registrationNumber ? (
                        <Fragment>
                          <strong>Registration number:</strong>{' '}
                          {complaint.registrationNumber}
                        </Fragment>
                      ) : (
                        ''
                      )}
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className={classes.row}>
                      <strong>Description:</strong>{' '}
                      {!loading && complaint !== null
                        ? complaint.description
                        : ''}
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className={classes.row}>
                      <strong>Status:</strong>{' '}
                      {!loading && complaint !== null
                        ? getComplaintStatus(complaint.status)
                        : ''}
                    </div>
                  </GridItem>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </Fragment>
      )}
    </Fragment>
  );
};

Complaint.propTypes = {
  complaint: PropTypes.object.isRequired,
  getComplaint: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  complaint: state.complaint,
});

export default connect(mapStateToProps, { getComplaint })(Complaint);
