import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import PriceItem from './PriceItem';
import ShowDetailDialogContext from '../contexts/ShowDetailDialogContext'; // Import the context to pass the function.
import { IMAGE_PLACEHOLDER_URL, LAZY_IMAGE_CLASS } from '../config';


const styles = {
  avatar: {
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    marginBottom: '8px',
    transition: 'box-shadow .4s, transform .4s, width .4s, height .4s',
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
    '&:hover': {
      cursor: 'pointer'
    }
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


export const MenuItem = ({ classes, item }) => (
  <ShowDetailDialogContext.Consumer>
    {({ showDetailDialog, lazyImageObserver }) => (
      <div className={classes.menuItem}>
        {lazyImageObserver && <img ref={image => { if (image) lazyImageObserver.observe(image); }} src={IMAGE_PLACEHOLDER_URL} data-src={item.photo} className={`${classes.avatar} ${LAZY_IMAGE_CLASS}`} onClick={() => showDetailDialog(item._id)} alt="items" />}
        {/* istanbul ignore next */
          !lazyImageObserver && <img src={item.photo} className={classes.avatar} onClick={() => showDetailDialog(item._id)} alt="items" />
        }
        <Typography className={classes.menuName} color="primary" onClick={() => showDetailDialog(item._id)}>{item.name}</Typography>
        <PriceItem item={item} />
      </div>
    )}
  </ShowDetailDialogContext.Consumer>
);
MenuItem.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};
export default withStyles(styles)(MenuItem);
