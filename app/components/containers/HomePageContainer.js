import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchAllMenu } from '../../actions/MenuActions';

import Banner from '../Banner';
import MenuCategory from '../MenuCategory';
import { LAZY_IMAGE_CLASS } from '../../config';
import ItemDetailDialog from '../ItemDetailDialog';
import OrderFloatingButton from '../OrderFloatingButton';
import ShowDetailDialogContext from '../../contexts/ShowDetailDialogContext'; // Import the context to pass the function.


/** The component that shows the home page containt */
export class HomePageContainer extends Component {
  static propTypes = {
    menus: PropTypes.array,
    menuItems: PropTypes.object,
    fetchAllMenu: PropTypes.func.isRequired
  };

  static defaultProps = {
    menus: null,
    menuItems: null
  };

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
   * Initializing an IntersectionObserver in order to pass it to the React Context (ShowDetailDialogContexts)
   * @return {null} No return.
   */
  componentDidMount() {
    /* istanbul ignore next */
    if ('IntersectionObserver' in window) this.lazyImageObserver = new IntersectionObserver(this.replaceImage);
  }

  /**
   * Removing the resize listener when the component unmounted.
   * @return {null} No return.
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  /**
   * Calculating the total amount of item will show.
   * @param {number} width is the current browser width.
   * @return {number} Return a number will be showed. width > 1200 shows 12, > 987 shows 10, >801 shows 8, < 615 shows 6
   */
  static getAmountNumber = width => {
    if (width <= 801) return 6;
    if (width <= 987) return 8;
    if (width <= 1200) return 10;
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
   * The callback function for the IntersectionObserver.
   * @param {array} entries is an array that offers when the intersection changed.
   * @param {object} observer will not be use here.
   * @return {null} No return.
   */
  replaceImage = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { // Replacing the src to the real url and remove the image from the observe list.
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove(LAZY_IMAGE_CLASS);
        this.lazyImageObserver.unobserve(lazyImage);
      }
    });
  }

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
        <ShowDetailDialogContext.Provider value={{ showDetailDialog: this.showDetailDialog, lazyImageObserver: this.lazyImageObserver }}>
          {menus && menus.map(menu => <MenuCategory menu={menu} key={menu._id} itemAmount={itemAmount} />)}
        </ShowDetailDialogContext.Provider>
        <OrderFloatingButton />
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
