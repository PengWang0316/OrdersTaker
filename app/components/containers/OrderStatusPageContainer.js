import React, { Component } from 'react';

/**
 * Show the detailed information about an order's status.
 */
export class OrderStatusPageContainer extends Component {
  /**
   * Load the data based on the order id the component retreived from the url.
   * @param {object} props contains all props' value for the component.
   * @return {null} No return.
   */
  constructor(props) {
    super(props);
    this.state = {
      orderId: props.match.params.orderId
    };
  }

  /**
   * The render method for the component.
   * @return {jsx} Return the jsx.
   */
  render() {
    const { orderId } = this.state;
    return (
      <div>{orderId}</div>
    );
  }
}
export default OrderStatusPageContainer;
