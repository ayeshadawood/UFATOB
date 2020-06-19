import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import GridItem from '../../../components/Grid/GridItem.js';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardBody from '../../../components/Card/CardBody.js';
import Table from '../../../components/Table/Table.js';
import Moment from 'react-moment';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { removeEducation } from '../../../actions/profile';

const Education = ({ classes, education, removeEducation }) => {
  const getEducation = () => {
    let res = [];
    education.forEach((education) => {
      res = [
        ...res,
        [
          education.school,
          <Moment format='DD-MMM-YYYY'>{education.from}</Moment>,
          education.current ? (
            'Now'
          ) : (
            <Moment format='DD-MMM-YYYY'>{education.to}</Moment>
          ),
          <IconButton onClick={() => removeEducation(education._id)}>
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
            <h4 className={classes.cardTitleWhite}>Education credentials</h4>
            <p className={classes.cardCategoryWhite}>
              Below is a list of your education history
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor='primary'
              tableHead={['School', 'From', 'To', 'Actions']}
              tableData={getEducation()}
            />
          </CardBody>
        </Card>
      </GridItem>
    </Fragment>
  );
};

Education.propTypes = {
  classes: PropTypes.object.isRequired,
  education: PropTypes.array.isRequired,
  removeEducation: PropTypes.func.isRequired,
};

export default connect(null, { removeEducation })(Education);
