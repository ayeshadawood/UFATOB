import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
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
                  <strong>Title:</strong>{' '}
                  {!loading && request !== null ? request.title : ''}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.row}>
                  <strong>Institute:</strong>{' '}
                  {!loading && request !== null ? request.institute : ''}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.row}>
                  <strong>Campus:</strong>{' '}
                  {!loading && request !== null ? request.campus : ''}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.row}>
                  <strong>Department:</strong>{' '}
                  {!loading && request !== null ? request.department : ''}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.row}>
                  <strong>Description:</strong>{' '}
                  {!loading && request !== null ? request.description : ''}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.row}>
                  <strong>Status:</strong>{' '}
                  {!loading && request !== null
                    ? getRequestStatus(request.status)
                    : ''}
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
