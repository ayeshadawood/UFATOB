import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import './Homepage.styles.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const Homepage = ({ classes }) => {
  return (
    <Fragment>
      <div className={classes.logo}>LOGO</div>
      <div className='carusel'>
        <Carousel autoPlay infiniteLoop showThumbs={false}>
          <div>
            <img src='https://www.stevensegallery.com/1287/724' />
          </div>
          <div>
            <img src='https://www.stevensegallery.com/640/360' />
          </div>
          <div>
            <img src='https://www.stevensegallery.com/640/360' />
          </div>
        </Carousel>
      </div>
      <div className='mera-apna-container'>
        <div className='row'>
          <div className='col m7 noticeboard'>
            <div className='heading'>NOTICEBOARD</div>
            <ul>
              <li>
                <a href=''>
                  <div className='announcement-title'>Hello Sirssssss</div>
                </a>

                <a href=''>
                  <div className='important-announcement'>
                    Very Important Announcment
                  </div>
                </a>
                <a href=''>
                  <div className='event-title'>Hello Sirssssss</div>
                  <p className='event-desc'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sapiente harum, nesciunt ullam, molestias est quas
                    recusandae eligendi officiis vel quasi cumque exercitationem
                    maiores modi quis delectus nobis? Iure eligendi id quis
                    assumenda, reprehenderit dolorum obcaecati sed iusto debitis
                    natus eveniet beatae sunt qui rerum aspernatur facilis nisi
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sapiente harum, nesciunt ullam, molestias est quas
                    recusandae eligendi officiis vel quasi cumque exercitationem
                    maiores modi quis delectus nobis? Iure eligendi id quis
                    assumenda, reprehenderit dolorum obcaecati sed iusto debitis
                    natus eveniet beatae sunt qui rerum aspernatur facilis nisi
                  </p>
                </a>
                <a href=''>
                  <div className='tender-title'>Toiletttsss</div>
                </a>
              </li>
            </ul>
          </div>
          <div className='col m4 login'>
            <div className='row'>
              <form className='col s12'>
                <div className='row'>
                  <div className='input-field col s12'>
                    <i className='material-icons prefix'>alternate_email</i>
                    <input id='icon_prefix' type='Email' className='validate' />
                    <label for='icon_prefix'>Email</label>
                  </div>
                  <div className='input-field col s12'>
                    <i className='material-icons prefix'>vpn_key</i>
                    <input
                      id='icon_telephone'
                      type='Password'
                      className='validate'
                    />
                    <label for='icon_telephone'>Password</label>
                    <button
                      className='btn waves-effect waves-light'
                      type='submit'
                      name='action'
                    >
                      LOGIN
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Homepage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Homepage;
