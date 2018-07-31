import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';

const styles = {
  title: {
    fontWeight: 'bold',
    maringBottom: 20
  },
  categoryTitle: {
    fontSize: 14
  },
  hrStyle: {
    border: 0,
    borderBottom: '1px dotted #ccc',
    background: '#999',
    margin: '10px 0'
  },
};

export const OrderSummaryCategories = ({ orders, classes }) => (
  <Fragment>
    <Typography className={classes.title} variant="subheading" color="primary">Order summary</Typography>
    <List disablePadding dense>
      {Object.keys(orders.categories).map(category => (
        <ListItem button key={category}>
          <ListItemText className={classes.categoryTitle} primary={`${category} × ${orders.categories[category].qty}`} />
          <ListItemSecondaryAction>
            <Typography color="textSecondary">${orders.categories[category].price}</Typography>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
    <div className={classes.hrStyle} />
  </Fragment>
);
OrderSummaryCategories.propTypes = {
  classes: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired
};
export default withStyles(styles)(OrderSummaryCategories);
