import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CardHeader, Tooltip } from '@material-ui/core';
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

export const OrderBrowserCardHeader = ({ order, classes, ...rest }) => {
  const orderDate = new Date(order.dateStamp);
  let avatarElement;
  switch (order.status) {
    case ORDER_STATUS_FINISHED:
      avatarElement = (
        <Tooltip title="Finished" placement="right-end">
          <CheckCircle className={classes.checkCircle} />
        </Tooltip>
      );
      break;
    case ORDER_STATUS_RECEIVED:
      avatarElement = (
        <Tooltip title="Received" placement="right-end">
          <OfflinePin className={classes.offlinPin} />
        </Tooltip>
      );
      break;
    case ORDER_STATUS_PREPARING:
      avatarElement = (
        <Tooltip title="Preparing" placement="right-end">
          <WatchLater className={classes.watchLater} />
        </Tooltip>
      );
      break;
    default:
      avatarElement = (
        <Tooltip title="Unknow Status" placement="right-end">
          <Help className={classes.unknow} />
        </Tooltip>
      );
      break;
  }
  return (
    <CardHeader
      avatar={avatarElement}
      title={orderDate.toDateString()}
      subheader={orderDate.toLocaleTimeString()}
      {...rest}
    />
  );
};
OrderBrowserCardHeader.propTypes = {
  order: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(OrderBrowserCardHeader);
