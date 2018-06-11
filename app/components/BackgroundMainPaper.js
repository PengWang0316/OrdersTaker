import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper } from '@material-ui/core';

const styles = {
  root: {
    backgroundImage: 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)',
    width: '100%',
    height: '100%',
    padding: '0 20px'
  },
  paper: {
    margin: '40px auto 20px auto',
    maxWidth: 1024,
    borderRadius: '10px'
  }
};

export const BackgroundMainPaper = ({ classes, children }) => (
  <div className={classes.root}>
    <Paper className={classes.paper} elevation={4}>
      {children}
    </Paper>
  </div>
);
BackgroundMainPaper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};
export default withStyles(styles)(BackgroundMainPaper);
