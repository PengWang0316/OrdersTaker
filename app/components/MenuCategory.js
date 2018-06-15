import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import MenuItem from './MenuItem';
import HiddenItemPanel from './HiddenItemPanel';

const flexBox = {
  display: 'flex',
  flexWrap: 'wrap'
};

const styles = {
  root: {
    maxWidth: 1200,
    padding: '10px 20px',
    margin: '15px auto'
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  flexBoxAround: {
    ...flexBox,
    justifyContent: 'space-around'
  },
  flexBoxStart: {
    ...flexBox,
    justifyContent: 'flex-start'
  },
  '@media (max-width: 500px)': {
    flexBoxStart: { justifyContent: 'center' }
  }
};

/**
 * @param {object} items contains item objects.
 * @param {number} itemAmount is the number will be showed at the panel.
 * @return {array} Return a two elements array. The first one is the items will be showed when the second one is the items that will be hidden.
 */
const getSeparatedItems = (items, itemAmount) => {
  const returnArray = [[], []];
  items.forEach((item, index) => {
    if (index < itemAmount) returnArray[0].push(item);
    else returnArray[1].push(item);
  });
  return returnArray;
};

export const MenuCategory = ({ classes, menu, itemAmount }) => {
  const separatedArray = getSeparatedItems(menu.items, itemAmount);
  return (
    <div className={classes.root}>
      <Typography className={classes.title} color="secondary" name={menu.category}>
        {menu.category}
      </Typography>
      <div className={menu.items.length < itemAmount ? classes.flexBoxStart : classes.flexBoxAround}>
        {separatedArray[0].map(item => <MenuItem key={item._id} item={item} />)}
      </div>
      <HiddenItemPanel items={separatedArray[1]} category={menu.category} />
    </div>
  );
};
MenuCategory.propTypes = {
  classes: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired,
  itemAmount: PropTypes.number.isRequired

};
export default withStyles(styles)(MenuCategory);
