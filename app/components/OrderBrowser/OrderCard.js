import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography, IconButton, Tooltip } from '@material-ui/core';
import { DeleteForever, Link } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

import OrderBrowserCardHeader from './OrderBrowserCardHeader';
import OrdersPageContext from '../../contexts/OrdersPageContext';

const styles = {
  card: {
    minWidth: 300,
    maxWidth: 500,
    margin: '10px 10px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  iconButton: {
    width: 30,
    height: 30
  },
  deleteButton: {
    color: red[400]
  },
  icon: {
    width: 20,
    height: 20
  }
};

export const OrderCard = ({ order, classes, menuItems }) => {
  const itemsKey = Object.keys(order.items);
  return (
    <OrdersPageContext.Consumer>
      {({ handleShowDetail, handleRmoveUnloginOrder, handleLinkOrder }) => (
        <Card className={classes.card}>
          <OrderBrowserCardHeader order={order} onClick={() => handleShowDetail(order)} />
          <CardMedia className={classes.media} image={menuItems[itemsKey[0]].photo} title={menuItems[itemsKey[0]].name} onClick={() => handleShowDetail(order)} />
          <CardContent className={classes.cardContent}>
            <div>
              <Typography className={classes.title} color="textSecondary">This order has {itemsKey.length} items</Typography>
              <Typography color="textSecondary">Total Price: ${order.totalPrice}</Typography>
            </div>
            {!order.userId && (
              <div>
                <Tooltip title="Remove this order from this device">
                  <IconButton onClick={() => handleRmoveUnloginOrder(order._id)} className={`${classes.iconButton} ${classes.deleteButton}`}><DeleteForever className={classes.icon} /></IconButton>
                </Tooltip>
                <Tooltip title="Link this order to your account">
                  <IconButton onClick={() => handleLinkOrder(order._id)} color="primary" className={classes.iconButton}><Link className={classes.icon} /></IconButton>
                </Tooltip>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </OrdersPageContext.Consumer>
  );
};
OrderCard.propTypes = {
  order: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  menuItems: PropTypes.object.isRequired
};
export default withStyles(styles)(OrderCard);
