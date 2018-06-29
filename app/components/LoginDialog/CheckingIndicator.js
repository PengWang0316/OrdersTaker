import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Tooltip } from '@material-ui/core';
import { CheckCircle, Error } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { orange, red, green } from '@material-ui/core/colors';

const adjustPosition = {
  position: 'relative',
  top: -10
};

const styles = {
  circularProgress: {
    ...adjustPosition,
    color: orange[800]
  },
  checkCircle: {
    ...adjustPosition,
    color: green[500]
  },
  error: {
    ...adjustPosition,
    color: red[500]
  }
};

export const CheckingIndicator = ({ classes, isChecking, isAvaliable }) => (
  <Fragment>
    {isChecking && <CircularProgress className={classes.circularProgress} size={20} />}
    {!isChecking && (isAvaliable ? <CheckCircle className={classes.checkCircle} size={20} /> : (
      <Tooltip id="usernameTooltip" title="This user name has already been taken.">
        <Error className={classes.error} size={20} />
      </Tooltip>
    ))}
  </Fragment>
);
CheckingIndicator.propTypes = {
  classes: PropTypes.object.isRequired,
  isChecking: PropTypes.bool.isRequired,
  isAvaliable: PropTypes.bool.isRequired
};
export default withStyles(styles)(CheckingIndicator);
