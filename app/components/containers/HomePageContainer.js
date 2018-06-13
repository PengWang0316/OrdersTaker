import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchAllMenu } from '../../actions/MenuActions';

import Banner from '../Banner';
import MenuCategory from '../MenuCategory';

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
    if (!props.menus) props.fetchAllMenu();
  }

  /**
   * Rendering the jsx for the component.
   * @return {jsx} Return jsx
   */
  render() {
    const { menus } = this.props;
    return (
      <Fragment>
        <Banner />
        {menus && menus.map(menu => <MenuCategory menu={menu} key={menu._id} />)}
      </Fragment>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  menus: state.menus
});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  fetchAllMenu: () => dispatch(fetchAllMenu())
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
