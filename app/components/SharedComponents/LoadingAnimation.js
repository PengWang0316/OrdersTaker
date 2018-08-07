import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

const styles = {
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 150,
    padding: '0 30px'
  },
  div: {
    width: '100%'
  }
};

export const LoadingAnimation = ({ isLoading, classes }) => (
  <Fragment>
    {isLoading && (
      <div className={classes.root}>
        {/* The LinearProgress needs an additional div to wrap it in order to show the position correctly. */}
        <div className={classes.div}>
          <LinearProgress />
        </div>
      </div>
    )}
  </Fragment>
);
LoadingAnimation.propTypes = {
  isLoading: PropTypes.bool,
  classes: PropTypes.object.isRequired
};
LoadingAnimation.defaultProps = { isLoading: true };
/* istanbul ignore next */
const mapStateToProps = state => ({ isLoading: state.isLoading });
export default connect(mapStateToProps, null)(withStyles(styles)(LoadingAnimation));
