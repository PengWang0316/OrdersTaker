import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  List, ListItem, ListItemText, ListItemSecondaryAction, Avatar, Typography
} from '@material-ui/core';
import { CheckCircle as CheckCircleIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';

import { ITEM_ONE_PRICE_KEY } from '../../config';

const styles = {
  root: {
    width: '100%'
  },
  avatar: {
    marginRight: 10
  },
  checkIcon: {
    color: lightGreen[500]
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

export const UnfinishedOrderList = ({
  order, menuItems, classes, onClick
}) => (
  <List className={classes.root}>
    {menuItems && Object.keys(order.items).map(key => (
      <ListItem key={key} button name={key} onClick={() => onClick(order._id, key)}>
        <Avatar src={menuItems[key].photo} className={classes.avatar} />
        <Typography color="primary">
          {menuItems[key].name}
        </Typography>
        <ListItemText primary={getQtyString(order.items[key].qty)} />
        {order.finishedItems && order.finishedItems[key] && (
          <ListItemSecondaryAction>
            <CheckCircleIcon className={classes.checkIcon} />
          </ListItemSecondaryAction>
        )}
      </ListItem>
    ))}
  </List>
);
UnfinishedOrderList.propTypes = {
  classes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  menuItems: PropTypes.object,
  onClick: PropTypes.func.isRequired
};
UnfinishedOrderList.defaultProps = {
  menuItems: null
};
/* istanbul ignore next */
const mapStateToProps = state => ({
  menuItems: state.menuItems
});
export default connect(mapStateToProps, null)(withStyles(styles)(UnfinishedOrderList));
