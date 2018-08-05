import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, Button, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons/';

import dialogStyles from '../../styles/DialogSytels';
import OrderBrowserCardHeader from '../OrderBrowser/OrderBrowserCardHeader';
import CartPageContainer from '../containers/CartPageContainer';
import OrderList from '../OrderList';
import OrderSummaryCategories from '../OrderSummaryCategories';
import OrderSummaryPrice from '../OrderSummaryPrice';
import ItemDetailDialog from '../ItemDetailDialog';
import ShowDetailDialogContext from '../../contexts/ShowDetailDialogContext'; // Import the context to pass the function.


const styles = ({
  ...dialogStyles, // Extending some basic dialog styles from DialogSytels.
  dialogPaper: { ...dialogStyles.dialogPager, minWidth: 300, maxWidth: 1100 },
  headerDiv: { // These styles are using to cancel the CardHeader's default padding styles.
    position: 'relative',
    top: -20,
    left: -30
  },
  contentDiv: {
    display: 'grid',
    gridTemplateColums: '1fr 300px',
    gridTemplateRows: '1fr',
    gridTemplateAreas: '"contentPanel summaryPanel"',
    gridGap: '2em'
  },
  contentPanel: {
    gridArea: 'contentPanel'
  },
  summaryPanel: {
    gridArea: 'summaryPanel',
    minWidth: 240
  },
  summaryContent: {
    position: 'sticky',
    top: 20
  },
  priceDiv: {
    display: 'flex',
    contentJustify: 'flex-end'
  },
  '@media (max-width: 734px)': {
    contentDiv: {
      gridTemplateColums: '1fr',
      gridTemplateRows: '100% 1fr',
      gridTemplateAreas: `"summaryPanel"
                          "contentPanel"`
    }
  }
});

/**
 * The component that is using to show the order's detail.
 */
export class OrderDetailDialog extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    order: PropTypes.object,
    menuItems: PropTypes.object
  };

  static defaultProps = {
    order: null,
    menuItems: null
  };

  state = {
    isItemDetailDialogOpen: false,
    currentOrder: null
  }

  /**
   * Setting the isItemDetailDialogOpen state to the opposite value.
   * @return {null} No return.
   */
  handleDialogToggle = () => this.setState(({ isItemDetailDialogOpen }) => ({ isItemDetailDialogOpen: !isItemDetailDialogOpen }));

  /**
   * Setting up a new currentOrder state and call the handleDialogToggle method.
   * @param {string} orderId is the id of new order will be showed in the detail dialog.
   * @return {null} No return.
   */
  showDetailDialog = orderId => this.setState({ currentOrder: this.props.menuItems[orderId] }, () => this.handleDialogToggle());

  /**
   * The render method.
   * @return {jsx} Returning the jsx for the component.
   */
  render() {
    const { onClose, open, order, menuItems, classes } = this.props;
    const { currentOrder, isItemDetailDialogOpen } = this.state;
    let newOrder;
    if (this.lastOrder === order && this.lastNewOrder) newOrder = this.lastNewOrder; // If the order did not change and we have the computed new order, just return instead of recomputing.
    else if (order) {
      newOrder = CartPageContainer.parseOrders(order.items, menuItems); // Calling the parserOrders method from the CartPageContainer component.
      this.lastNewOrder = newOrder; // Storaging it for caching.
      this.lastOrder = order; // Storaging the current order to a veriable.
    }
    return (
      <Fragment>
        <Dialog onClose={onClose} open={open} classes={{ paper: classes.dialogPaper }}>
          <DialogContent className={classes.dialogContent}>
            {newOrder && (
              <Fragment>
                <IconButton onClick={onClose} className={classes.dialogCloseButton}><Close className={classes.dialogCloseIcon} /></IconButton>
                <div className={classes.headerDiv}><OrderBrowserCardHeader order={order} /></div>
                <div className={classes.contentDiv}>
                  <div className={classes.contentPanel}>
                    <ShowDetailDialogContext.Provider value={this.showDetailDialog}>
                      <OrderList orders={newOrder} orderItems={order.items} isHistoryOrder />
                    </ShowDetailDialogContext.Provider>
                  </div>
                  <div className={classes.summaryPanel}>
                    <div className={classes.summaryContent}>
                      <OrderSummaryCategories orders={newOrder} />
                      <div classes={classes.priceDiv}>
                        <OrderSummaryPrice orders={newOrder} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.dialogButtonDiv}>
                  <Button onClick={onClose} variant="contained" size="small" aria-label="Close the detail page" color="primary">Close</Button>
                </div>
              </Fragment>
            )}
          </DialogContent>
        </Dialog>
        {newOrder && <ItemDetailDialog onClose={this.handleDialogToggle} open={isItemDetailDialogOpen} item={currentOrder} />}
      </Fragment>
    );
  }
}
export default withStyles(styles)(OrderDetailDialog);
