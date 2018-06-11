import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  avatar: {
    width: '150px',
    height: '150px',
    marginBottom: '8px',
    transition: 'all 0.4s',
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '4px 4px 12px 1px rgba(0, 0, 0, 0.4)',
      transform: 'scale(1.1, 1.1)'
    }
  },
  menuItem: {
    textAlign: 'center',
    margin: '15px 18px',
    width: '150px'
  },
  menuName: {
    fontSize: 14,
    fontWeight: 'bold',
    wordWrap: 'break-word',
  },
  addButton: {
    width: 40,
    height: 40
  },
  addButtonIcon: {
    width: 20,
    height: 20
  },
  priceDiv: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  '@media (max-width: 600px)': {
    avatar: {
      width: '200px',
      height: '200px',
      marginBottom: '15px'
    },
    menuName: {
      fontSize: 18,
    },
    menuItem: { width: '200px' }
  }
};

export const MenuItem = ({ classes }) => (
  <div className={classes.menuItem}>
    <Avatar alt="Remy Sharp" src="http://res.cloudinary.com/orderstaker/image/upload/c_fit,h_300,q_auto:good,w_300/v1528599880/menu/food.jpg" className={classes.avatar} />
    <Typography className={classes.menuName} color="primary">Some name for dish</Typography>
    <div className={classes.priceDiv}>
      <Typography color="textSecondary">$12.5</Typography>
      <Tooltip id="tooltip-fab" title="Add to your order" placement="right-end">
        <IconButton className={classes.addButton} aria-label="Add to your order" color="primary">
          <AddBoxIcon className={classes.addButtonIcon} />
        </IconButton>
      </Tooltip>
    </div>
  </div>
);
MenuItem.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(MenuItem);
