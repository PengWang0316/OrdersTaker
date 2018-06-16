import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchAllMenu } from '../../actions/MenuActions';

import Banner from '../Banner';
import MenuCategory from '../MenuCategory';
import ItemDetailDialog from '../ItemDetailDialog';
import ShowDetailDialogContext from '../../contexts/ShowDetailDialogContext'; // Import the context to pass the function.


/** The component that shows the home page containt */
export class HomePageContainer extends Component {
  static propTypes = {
    menus: PropTypes.array,
    fetchAllMenu: PropTypes.func.isRequired
  };
  static defaultProps = { menus: null };

  /**
   * call fetchAllMenu method when the menus is null
   * @param {object} props is an object that contains props' values
   */
  constructor(props) {
    super(props);
    if (!props.menus) props.fetchAllMenu(); // Fetching the menu data if it has not exsited in the Redux yet.
    window.addEventListener('resize', this.handleResize);
  }

  /**
   * itemAmount is the number will be showed on the page (Rest of them will be hidden in an expaned panel.)
   * width > 1200 shows 12, > 987 shows 10, >801 shows 8, < 615 shows 6
   */
  state = {
    itemAmount: HomePageContainer.getAmountNumber(window.innerWidth),
    isDialogOpen: false,
    currentItem: null
  };


  /**
   * Calculating the total amount of item will show.
   * @param {number} width is the current browser width.
   * @return {number} Return a number will be showed. width > 1200 shows 12, > 987 shows 10, >801 shows 8, < 615 shows 6
   */
  static getAmountNumber = width => {
    if (width <= 801) return 6;
    else if (width <= 987) return 8;
    else if (width <= 1200) return 10;
    return 12;
  };

  /**
   * Using to get current browser width and set it to state.
   * @return {null} No return.
   */
  handleResize = () => this.setState({
    itemAmount: HomePageContainer.getAmountNumber(window.innerWidth)
  });

  /**
   * Showing the item detail dialog.
   * Making sure the currentItem has been setup before open the dialog.
   * @param {string} itemId is the id of an item.
   * @return {null} No return.
   */
  showDetailDialog = itemId => this.setState(
    { currentItem: this.props.menuItems[itemId] },
    () => this.handleDialogToggle()
  );

  /**
   * Setting the isDialogOpen state to a opposite value.
   * @return {null} Ignore tht return.
   */
  handleDialogToggle = () => this.setState(({ isDialogOpen }) => ({ isDialogOpen: !isDialogOpen }));

  /**
   * Rendering the jsx for the component.
   * @return {jsx} Return jsx
   */
  render() {
    const { menus } = this.props;
    const { itemAmount, isDialogOpen, currentItem } = this.state;
    return (
      <Fragment>
        <Banner />
        <ShowDetailDialogContext.Provider value={this.showDetailDialog}>
          {menus && menus.map(menu =>
            <MenuCategory menu={menu} key={menu._id} itemAmount={itemAmount} />)}
        </ShowDetailDialogContext.Provider>
        <ItemDetailDialog onClose={this.handleDialogToggle} open={isDialogOpen} item={currentItem} />
      </Fragment>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  menus: state.menus,
  menuItems: state.menuItems
});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  fetchAllMenu: () => dispatch(fetchAllMenu())
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
