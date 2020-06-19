import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import GridItem from '../../../components/Grid/GridItem.js';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardBody from '../../../components/Card/CardBody.js';
import { connect } from 'react-redux';
import { TextField, Button, Grid } from '@material-ui/core';
import { setAlert } from '../../../actions/alert';
import {
  uploadProfilePicture,
  removeProfilePicture,
} from '../../../actions/auth';

const ProfilePicture = ({
  classes,
  auth: { user },
  setAlert,
  uploadProfilePicture,
  removeProfilePicture,
}) => {
  const [formData, setFormData] = useState({
    image: '',
  });

  const { image } = formData;

  const onChange = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData({ ...formData, image: e.target.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (image === '') {
      setAlert('No image selected', 'error');
    } else {
      uploadProfilePicture(formData);
    }
  };

  return (
    <Fragment>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Profile picture</h4>
            <p className={classes.cardCategoryWhite}>
              Use the options below to upload or remove your profile picture
            </p>
          </CardHeader>
          <CardBody>
            <Grid item xs={12} sm={12} md={12} style={{ textAlign: 'center' }}>
              <img
                src={user !== null ? user.avatar : ''}
                alt='Profile picture'
                style={{ borderRadius: '50%', width: '200px', height: '200px' }}
              />
            </Grid>
            <form onSubmit={(e) => onSubmit(e)}>
              <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    onChange={(e) => onChange(e)}
                    variant='outlined'
                    fullWidth={true}
                    className={classes.input}
                    margin='dense'
                    type='file'
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Button
                    color='primary'
                    variant='contained'
                    fullWidth={true}
                    type='submit'
                    className={classes.input}
                  >
                    Upload
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Button
                    color='primary'
                    variant='contained'
                    fullWidth={true}
                    style={{ backgroundColor: 'red' }}
                    onClick={() => removeProfilePicture()}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </Fragment>
  );
};

ProfilePicture.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  uploadProfilePicture: PropTypes.func.isRequired,
  removeProfilePicture: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setAlert,
  uploadProfilePicture,
  removeProfilePicture,
})(ProfilePicture);
