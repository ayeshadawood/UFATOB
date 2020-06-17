import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Grid, TextField, Button, InputAdornment } from '@material-ui/core';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import { AlternateEmail, VpnKey } from '@material-ui/icons';

import image1 from 'assets/images/image1.png';
import image2 from 'assets/images/image2.png';
import image3 from 'assets/images/image3.png';
import image4 from 'assets/images/image4.png';
import image5 from 'assets/images/image5.png';
import image6 from 'assets/images/image6.png';
import image7 from 'assets/images/image7.png';

const Homepage = ({
  classes,
  auth: { loading, isAuthenticated, user },
  login,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (!loading && isAuthenticated && user !== null && user.type === 0) {
    return <Redirect to='/hec' />;
  } else if (!loading && isAuthenticated && user !== null && user.type === 1) {
    return <Redirect to='/university' />;
  } else if (!loading && isAuthenticated && user !== null && user.type === 2) {
    return <Redirect to='/user' />;
  }

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <div className={classes.logo}>UFATOB</div>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Carousel autoPlay infiniteLoop showThumbs={false}>
            <div>
              <img src={image1} />
            </div>
            <div>
              <img src={image2} />
            </div>
            <div>
              <img src={image3} />
            </div>
            <div>
              <img src={image4} />
            </div>
            <div>
              <img src={image5} />
            </div>
            <div>
              <img src={image6} />
            </div>
            <div>
              <img src={image7} />
            </div>
          </Carousel>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <div className={classes.noticeboard}>
            <div className={classes.headingNoticeboard}>NOTICEBOARD</div>

            <div className={classes.importantHeading}>
              Current announcements
            </div>
            <a href=''>
              <div className={classes.title}>Title of announcment</div>
              <p className={classes.desc}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Sapiente harum, nesciunt ullam, molestias est quas recusandae
                eligendi officiis vel quasi cumque exercitationem maiores modi
                quis delectus nobis? Iure eligendi id quis assumenda,
                reprehenderit dolorum obcaecati sed iusto debitis natus eveniet
                beatae sunt qui rerum aspernatur facilis nisi Lorem ipsum dolor,
                sit amet consectetur adipisicing elit. Sapiente harum, nesciunt
                ullam, molestias est quas recusandae eligendi officiis vel quasi
                cumque exercitationem maiores modi quis delectus nobis? Iure
                eligendi id quis assumenda, reprehenderit dolorum obcaecati sed
                iusto debitis natus eveniet beatae sunt qui rerum aspernatur
                facilis nisi
              </p>
            </a>

            <div className={classes.importantHeading}>Past announcements</div>

            <div className={classes.importantHeading}>Upcoming events</div>

            <div className={classes.importantHeading}>Past events</div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <div className={classes.login}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <div
                  className={classes.importantHeading}
                  style={{
                    textAlign: 'center',
                    fontSize: '56px',
                    marginBottom: '30px',
                  }}
                >
                  Login
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <form onSubmit={(e) => onSubmit(e)}>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      name='email'
                      value={email}
                      onChange={(e) => onChange(e)}
                      label='Email'
                      variant='outlined'
                      fullWidth={true}
                      margin='dense'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <AlternateEmail />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      name='password'
                      value={password}
                      onChange={(e) => onChange(e)}
                      type='password'
                      label='Password'
                      variant='outlined'
                      fullWidth={true}
                      className={classes.input}
                      margin='dense'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <VpnKey />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Button
                      color='primary'
                      variant='contained'
                      fullWidth={true}
                      type='submit'
                    >
                      Login
                    </Button>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

Homepage.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Homepage);
