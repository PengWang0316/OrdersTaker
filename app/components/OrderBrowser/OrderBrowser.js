import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardMedia, CardContent, Typography, IconButton, Tooltip } from '@material-ui/core';
import { DeleteForever, Link } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import OrderBrowserCardHeader from './OrderBrowserCardHeader';

const flex = {
  display: 'flex',
  flexWrap: 'wrap'
};

const styles = {
  root: {
    width: '90%',
    margin: '40px auto'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  cardDiv: {
    ...flex
  },
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
    ...flex,
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

export const OrderBrowser = ({
  orders, classes, title, menuItems, onShowDetail, onRemoveOrder, onLinkOrder
}) => (
  <div className={classes.root}>
    <Typography color="primary" className={classes.title}>{title}</Typography>
    {Object.keys(menuItems).length !== 0 && (
      <div className={classes.cardDiv}>
        {orders.map(order => {
          const itemsKey = Object.keys(order.items);
          return (
            <Card key={order._id} className={classes.card}>
              <OrderBrowserCardHeader order={order} onClick={() => onShowDetail(order)} />
              <CardMedia className={classes.media} image={menuItems[itemsKey[0]].photo} title={menuItems[itemsKey[0]].name} onClick={() => onShowDetail(order)} />
              <CardContent className={classes.cardContent}>
                <div>
                  <Typography className={classes.title} color="textSecondary">This order has {itemsKey.length} items</Typography>
                  <Typography color="textSecondary">Total Price: ${order.totalPrice}</Typography>
                </div>
                {!order.userId && (
                  <div>
                    <Tooltip title="Remove this order from this device">
                      <IconButton onClick={() => onRemoveOrder(order._id)} className={`${classes.iconButton} ${classes.deleteButton}`}><DeleteForever className={classes.icon} /></IconButton>
                    </Tooltip>
                    <Tooltip title="Link this order to your account">
                      <IconButton onClick={() => onLinkOrder(order._id)} color="primary" className={classes.iconButton}><Link className={classes.icon} /></IconButton>
                    </Tooltip>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    )}
  </div>
);
OrderBrowser.prototype = {
  orders: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  menuItems: PropTypes.object.isRequired,
  onShowDetail: PropTypes.func.isRequired,
  onRemoveOrder: PropTypes.func.isRequired,
  onLinkOrder: PropTypes.func.isRequired
};
/* istanbul ignore next */
const mapStateToProps = state => ({
  menuItems: state.menuItems
});
export default connect(mapStateToProps, null)(withStyles(styles)(OrderBrowser));
