import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  List, ListItem, ListItemText, ListItemSecondaryAction, Avatar, Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { ITEM_ONE_PRICE_KEY } from '../../config';

const styles = {
  root: {
    width: '100%'
  },
  avatar: {
    marginRight: 10
  }
};

const getQtyString = qtyObject => {
  let returnStr = '';
  Object.keys(qtyObject).forEach(key => {
    if (key !== ITEM_ONE_PRICE_KEY) returnStr += `${key} × ${qtyObject[key]} `;
    else returnStr += `× ${qtyObject[key]}`;
  });
  return returnStr;
};

export const UnfinishedOrderList = ({ order, menuItems, classes }) => (
  <List className={classes.root}>
    {menuItems && Object.keys(order.items).map(key => (
      <ListItem key={key} button>
        <Avatar src={menuItems[key].photo} className={classes.avatar} />
        <Typography color="primary">
          {menuItems[key].name}
        </Typography>
        <ListItemText primary={getQtyString(order.items[key].qty)} />

      </ListItem>
    ))}
  </List>
);
UnfinishedOrderList.propTypes = {
  classes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  menuItems: PropTypes.object
};
UnfinishedOrderList.defaultProps = {
  menuItems: null
};
const mapStateToProps = state => ({
  menuItems: state.menuItems
});
export default connect(mapStateToProps, null)(withStyles(styles)(UnfinishedOrderList));
