import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { connect } from 'react-redux';

const CustomAlert = ({ alert: { showAlerts, alerts } }) => {
  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={showAlerts}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Fragment>
          {alerts.length > 0 &&
            alerts.map((alert) => (
              <div
                key={alert.id}
                style={{ marginBottom: '10px', width: '100%' }}
              >
                <Alert severity={alert.alertType}>{alert.msg}</Alert>
              </div>
            ))}
        </Fragment>
      </Snackbar>
    </Fragment>
  );
};

CustomAlert.propTypes = {
  alert: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(CustomAlert);
