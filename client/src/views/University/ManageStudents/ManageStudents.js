import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import Table from '../../../components/Table/Table.js';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardBody from '../../../components/Card/CardBody.js';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllStudents, deleteStudent } from '../../../actions/student';
import { activateAccount, deactivateAccount } from '../../../actions/auth';
import Moment from 'react-moment';

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
};

const useStyles = makeStyles(styles);

const ManageStudents = ({
  student: { loading, students },
  getAllStudents,
  deleteStudent,
  activateAccount,
  deactivateAccount,
}) => {
  const classes = useStyles();

  const getStudents = () => {
    let res = [];
    let sNo = 1;
    students.forEach((student) => {
      res = [
        ...res,
        [
          sNo,
          student.name,
          student.email,
          <Moment format='DD-MMM-YYYY'>{student.date}</Moment>,
          student.activated ? (
            <Button
              color='primary'
              variant='contained'
              style={{ backgroundColor: 'red' }}
              onClick={() => deactivateAccount(student._id, 2)}
            >
              Deactivate
            </Button>
          ) : (
            <Button
              color='primary'
              variant='contained'
              style={{ backgroundColor: 'green' }}
              onClick={() => activateAccount(student._id, 2)}
            >
              Activate
            </Button>
          ),
        ],
      ];
      sNo++;
    });
    return res;
  };

  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Link to='/university/create-student'>
            <Button color='primary' variant='contained'>
              <i className='fas fa-user' style={{ marginRight: '5px' }}></i>
              Add new student
            </Button>
          </Link>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>Manage Students</h4>
              <p className={classes.cardCategoryWhite}>
                Below is a list of all the registered students
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor='primary'
                tableHead={['S.No.', 'Name', 'Email', 'Created at', 'Actions']}
                tableData={!loading && students.length > 0 ? getStudents() : []}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Fragment>
  );
};

ManageStudents.propTypes = {
  student: PropTypes.object.isRequired,
  getAllStudents: PropTypes.func.isRequired,
  deleteStudent: PropTypes.func.isRequired,
  activateAccount: PropTypes.func.isRequired,
  deactivateAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.student,
});

export default connect(mapStateToProps, {
  getAllStudents,
  deleteStudent,
  activateAccount,
  deactivateAccount,
})(ManageStudents);
