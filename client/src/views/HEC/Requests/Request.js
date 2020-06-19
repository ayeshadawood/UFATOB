import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardBody from '../../../components/Card/CardBody.js';
import { connect } from 'react-redux';
import { getRequest } from '../../../actions/request';

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

const Request = ({ request: { request, loading }, getRequest, match }) => {
  const classes = useStyles();

  const getRequestStatus = (status) => {
    switch (status) {
      case 0:
        return 'Forwarded to University';
      case 1:
        return 'Forwarded to HEC';
      case 2:
        return 'Accepted';
      case 3:
        return 'Rejected';
      default:
        return '';
    }
  };

  useEffect(() => {
    getRequest(match.params.id);
  }, [getRequest, match.params.id]);

  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>Fund Request</h4>
              <p className={classes.cardCategoryWhite}>
                Below is the detail of the fund request
              </p>
            </CardHeader>
            <CardBody>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.row}>
                  {!loading && request !== null && request.title ? (
                    <Fragment>
                      <strong>Title:</strong> {request.title}
                    </Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.row}>
                  {!loading && request !== null && request.name ? (
                    <Fragment>
                      <strong>Name:</strong> {request.name}
                    </Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.row}>
                  {!loading && request !== null && request.fatherName ? (
                    <Fragment>
                      <strong>Father name:</strong> {request.fatherName}
                    </Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.row}>
                  {!loading && request !== null && request.cnic ? (
                    <Fragment>
                      <strong>CNIC:</strong> {request.cnic}
                    </Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.row}>
                  {!loading && request !== null && request.dateOfBirth ? (
                    <Fragment>
                      <strong>Date of birth:</strong> {request.dateOfBirth}
                    </Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.row}>
                  {!loading && request !== null && request.institute ? (
                    <Fragment>
                      <strong>Institute:</strong> {request.institute.name}
                    </Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.row}>
                  {!loading && request !== null && request.campus ? (
                    <Fragment>
                      <strong>Campus:</strong> {request.campus}
                    </Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.row}>
                  {!loading &&
                  request !== null &&
                  request.registrationNumber ? (
                    <Fragment>
                      <strong>Registration number:</strong>{' '}
                      {request.registrationNumber}
                    </Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.row}>
                  {!loading && request !== null && request.degreeProgram ? (
                    <Fragment>
                      <strong>Degree program:</strong> {request.degreeProgram}
                    </Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.row}>
                  {!loading && request !== null && request.department ? (
                    <Fragment>
                      <strong>Department:</strong> {request.department}
                    </Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.row}>
                  {!loading && request !== null && request.semester ? (
                    <Fragment>
                      <strong>Semester:</strong> {request.semester}
                    </Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.row}>
                  {!loading && request !== null && request.description ? (
                    <Fragment>
                      <strong>Description:</strong> {request.description}
                    </Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.row}>
                  {!loading && request !== null && request.status ? (
                    <Fragment>
                      <strong>Status:</strong>{' '}
                      {getRequestStatus(request.status)}
                    </Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </GridItem>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Fragment>
  );
};

Request.propTypes = {
  request: PropTypes.object.isRequired,
  getRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  request: state.request,
});

export default connect(mapStateToProps, { getRequest })(Request);
