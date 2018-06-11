import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import MenuItem from './MenuItem';

const styles = {
  root: {
    width: '100%',
    padding: '10px 20px',
    margin: '15px auto'
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  flexBox: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  '@media (max-width: 500px)': {
    flexBox: { justifyContent: 'center' }
  }
};

export const MenuCategory = ({ classes }) => (
  <div className={classes.root}>
    <Typography className={classes.title} color="secondary">
      This is a sheet of paper.
    </Typography>
    <div className={classes.flexBox}>
      <MenuItem />
    </div>
  </div>
);
MenuCategory.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(MenuCategory);
