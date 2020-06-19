import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../../components/Grid/GridItem.js';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardBody from '../../../components/Card/CardBody.js';

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

const ProfileDetails = ({ profile }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Profile</h4>
            <p className={classes.cardCategoryWhite}>
              Below is the detail of your profile
            </p>
          </CardHeader>
          <CardBody>
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.row}>
                <strong>Website:</strong> {profile.website}
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.row}>
                <strong>Location:</strong> {profile.location}
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.row}>
                <strong>Contact no:</strong> {profile.contactNo}
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.row}>
                <strong>Bio:</strong> {profile.bio}
              </div>
            </GridItem>
          </CardBody>
        </Card>
      </GridItem>
    </Fragment>
  );
};

ProfileDetails.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileDetails;
