import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import { connect } from 'react-redux';
import { getProfileById } from '../../../actions/profile';
import { Typography, Grid, TextField } from '@material-ui/core';

import avatar from 'assets/img/faces/marc.jpg';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);

const Profile = ({
  getProfileById,
  profile: { loading, profile },
  auth,
  match,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);

  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {!loading &&
          profile === null &&
          !auth.loading &&
          auth.user !== null &&
          auth.user.type > 0 ? (
            <Typography variant='h5'>
              <i className='fas fa-user'></i>No profile exists for user
            </Typography>
          ) : (
            <Card profile>
              <CardAvatar profile>
                <img
                  src={
                    !loading &&
                    profile === null &&
                    !auth.loading &&
                    auth.user !== null &&
                    auth.user.type === 0
                      ? auth.user.avatar
                      : !loading && profile !== null
                      ? profile.user.avatar
                      : ''
                  }
                  alt=''
                />
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>
                  {!loading &&
                  profile === null &&
                  !auth.loading &&
                  auth.user !== null &&
                  auth.user.type === 0
                    ? auth.user.email
                    : !loading && profile !== null
                    ? profile.user.email
                    : ''}
                </h6>
                <h4 className={classes.cardTitle}>
                  {!loading &&
                  profile === null &&
                  !auth.loading &&
                  auth.user !== null &&
                  auth.user.type === 0
                    ? auth.user.name
                    : !loading && profile !== null
                    ? profile.user.name
                    : ''}
                </h4>
                {!loading && profile !== null && profile.bio && (
                  <p className={classes.description}>{profile.bio}</p>
                )}
              </CardBody>
            </Card>
          )}
        </GridItem>
      </GridContainer>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
