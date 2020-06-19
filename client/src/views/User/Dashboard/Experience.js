import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import GridItem from 'components/Grid/GridItem.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Table from 'components/Table/Table.js';
import Moment from 'react-moment';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { removeExperience } from '../../../actions/profile';

const Experience = ({ classes, experiences, removeExperience }) => {
  const getExperiences = () => {
    let res = [];
    experiences.forEach((experience) => {
      res = [
        ...res,
        [
          experience.company,
          <Moment format='DD-MMM-YYYY'>{experience.from}</Moment>,
          experience.current ? (
            'Now'
          ) : (
            <Moment format='DD-MMM-YYYY'>{experience.to}</Moment>
          ),
          <IconButton onClick={() => removeExperience(experience._id)}>
            <Close />
          </IconButton>,
        ],
      ];
    });
    return res;
  };

  return (
    <Fragment>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Experience credentials</h4>
            <p className={classes.cardCategoryWhite}>
              Below is a list of your experience history
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor='primary'
              tableHead={['Company', 'From', 'To', 'Actions']}
              tableData={getExperiences()}
            />
          </CardBody>
        </Card>
      </GridItem>
    </Fragment>
  );
};

Experience.propTypes = {
  classes: PropTypes.object.isRequired,
  experiences: PropTypes.array.isRequired,
  removeExperience: PropTypes.func.isRequired,
};

export default connect(null, { removeExperience })(Experience);
