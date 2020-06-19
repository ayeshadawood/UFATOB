import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Grid, TextField, Button, InputAdornment } from '@material-ui/core';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { getAllScrappedData } from '../../actions/scrapper';
import { Redirect } from 'react-router-dom';
import { AlternateEmail, VpnKey } from '@material-ui/icons';

import image1 from '../../assets/images/image1.png';
import image2 from '../../assets/images/image2.png';
import image3 from '../../assets/images/image3.png';
import image4 from '../../assets/images/image4.png';
import image5 from '../../assets/images/image5.png';
import image6 from '../../assets/images/image6.png';
import image7 from '../../assets/images/image7.png';

const Homepage = ({
  classes,
  auth: { loading, isAuthenticated, user },
  login,
  getAllScrappedData,
  scrapper: { scrappedData },
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

  useEffect(() => {
    getAllScrappedData();
  }, [getAllScrappedData]);

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
            {scrappedData !== null &&
              scrappedData.currentAnnouncements.length > 0 &&
              scrappedData.currentAnnouncements.map((currentAnnouncement) => (
                <a href={currentAnnouncement.url} target='_blank'>
                  <div
                    className={classes.title}
                    style={{ marginBottom: '15px' }}
                  >
                    {currentAnnouncement.title}
                  </div>
                </a>
              ))}
            <div className={classes.importantHeading}>Past announcements</div>
            {scrappedData !== null &&
              scrappedData.pastAnnouncements.length > 0 &&
              scrappedData.pastAnnouncements.map((pastAnnouncement) => (
                <a href={pastAnnouncement.url} target='_blank'>
                  <div
                    className={classes.title}
                    style={{ marginBottom: '15px' }}
                  >
                    {pastAnnouncement.title}
                  </div>
                </a>
              ))}
            <div className={classes.importantHeading}>Upcoming events</div>
            {scrappedData !== null &&
              scrappedData.upcomingEvents.length > 0 &&
              scrappedData.upcomingEvents.map((upcomingEvent) => (
                <a href={upcomingEvent.url} target='_blank'>
                  <div className={classes.title}>{upcomingEvent.title}</div>
                  <p className={classes.desc}>{upcomingEvent.description}</p>
                </a>
              ))}

            <div className={classes.importantHeading}>Past events</div>
            {scrappedData !== null &&
              scrappedData.pastEvents.length > 0 &&
              scrappedData.pastEvents.map((pastEvent) => (
                <a href={pastEvent.url} target='_blank'>
                  <div className={classes.title}>{pastEvent.title}</div>
                  <p className={classes.desc}>{pastEvent.description}</p>
                </a>
              ))}
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
  getAllScrappedData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  scrapper: state.scrapper,
});

export default connect(mapStateToProps, { login, getAllScrappedData })(
  Homepage
);
