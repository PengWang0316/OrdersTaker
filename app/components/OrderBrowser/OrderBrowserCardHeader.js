import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CardHeader } from '@material-ui/core';
import { lightGreen, yellow, grey, red } from '@material-ui/core/colors';
import { CheckCircle, OfflinePin, WatchLater, Help } from '@material-ui/icons';

import { ORDER_STATUS_FINISHED, ORDER_STATUS_RECEIVED, ORDER_STATUS_PREPARING } from '../../config';

const avatarIcon = {
  width: 40,
  height: 40
};

const styles = {
  checkCircle: {
    ...avatarIcon,
    color: lightGreen[700]
  },
  offlinPin: {
    ...avatarIcon,
    color: yellow[800]
  },
  watchLater: {
    ...avatarIcon,
    color: grey[500]
  },
  unknow: {
    ...avatarIcon,
    color: red[500]
  }
};

export const OrderBrowserCardHeader = ({ order, classes }) => {
  let avatarElement;
  let content;
  switch (order.status) {
    case ORDER_STATUS_FINISHED:
      avatarElement = <CheckCircle className={classes.checkCircle} />;
      content = 'This order has already finished';
      break;
    case ORDER_STATUS_RECEIVED:
      avatarElement = <OfflinePin className={classes.offlinPin} />;
      content = 'This order has been received';
      break;
    case ORDER_STATUS_PREPARING:
      avatarElement = <WatchLater className={classes.watchLater} />;
      content = 'This order is beening prepared';
      break;
    default:
      avatarElement = <Help className={classes.unknow} />;
      content = 'Unknow status';
      break;
  }
  return (<CardHeader
    avatar={avatarElement}
    title={content}
    subheader={new Date(order.dateStamp).toDateString()}
  />);
};
OrderBrowserCardHeader.propTypes = {
  order: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(OrderBrowserCardHeader);
