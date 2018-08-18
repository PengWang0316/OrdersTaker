import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { DoneAll as DoneAllIcon } from '@material-ui/icons';
import { lightGreen } from '@material-ui/core/colors';

const styles = {
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  flexDiv: {
    display: 'flex',
    alignItems: 'center'
  },
  finishPercentage: {
    fontWeight: 'bold',
    size: 14
  },
  progress: {
    position: 'relative',
    left: -33
  },
  circleIcon: {
    width: 30,
    height: 30,
    color: lightGreen[700]
  }
};

const getPercentageOfFinishing = (finishedItemsLength, itemsLength) => Math.floor((finishedItemsLength / itemsLength) * 100);

export const UnfinishedOrderRow = ({ order, classes }) => {
  const orderDate = new Date(order.dateStamp);
  let finishingPercentage = 0;
  if (order.finishedItems) { // If the order has some finished items, calculate the percentage for the finishing.
    const finishedItemsLength = Object.keys(order.finishedItems).length;
    const itemsLength = Object.keys(order.items).length;
    finishingPercentage = finishedItemsLength === itemsLength
      ? 100 : getPercentageOfFinishing(finishedItemsLength, itemsLength);
  }
  return (
    <div className={classes.root}>
      <Typography color="primary">Table {order.tableNumber}</Typography>
      <Typography color="textPrimary">
        {`${orderDate.getHours()}:${orderDate.getMinutes()} ${orderDate.toDateString()}`}
      </Typography>
      <div className={classes.flexDiv}>
        {finishingPercentage === 100 && <DoneAllIcon className={`${classes.circleIcon} ${classes.progress}`} />}
        {finishingPercentage !== 100 && (
          <Fragment>
            <Typography color="primary" className={classes.finishPercentage}>{finishingPercentage}%</Typography>
            <CircularProgress variant="static" value={finishingPercentage} size={36} className={classes.progress} />
          </Fragment>
        )}
      </div>
    </div>
  );
};
UnfinishedOrderRow.propTypes = {
  classes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired
};
export default withStyles(styles)(UnfinishedOrderRow);
