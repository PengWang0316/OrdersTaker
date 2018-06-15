import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { scroller } from 'react-scroll';

import MenuItem from './MenuItem';

const flexBox = {
  flexWrap: 'wrap',
  height: 'auto',
  maxHeight: 0,
  // lineHeight: 0,
  display: 'flex',
  overflow: 'hidden',
  transition: 'max-height 0.7s'
};

const styles = {
  buttonDiv: {
    width: '100%',
    textAlign: 'right'
  },
  flexBoxAround: {
    ...flexBox,
    justifyContent: 'space-around'
  },
  // flexBoxStart: {
  //   ...flexBox,
  //   justifyContent: 'flex-start'
  // },
  '@media (max-width: 500px)': {
    flexBoxAround: { justifyContent: 'center' }
  }
};

/**
 * Show the loading button and extra items
 */
export class HiddenItemPanel extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    // itemAmount: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = { isExpand: false };

  /**
   * Setting the isExpand state to true and scroll to the button's position when a user click the button.
   * react-scroll library is used.
   * @return {null} No return.
   */
  handleShowMoreClick = () => {
    // this.categoryTitle = this.categoryTitle || document.getElementById(this.props.category);
    this.setState(({ isExpand }) => {
      // if (isExpand) this.categoryTitle.scrollIntoView();
      if (isExpand) scroller.scrollTo(this.props.category, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
      return { isExpand: !isExpand };
    });
  }

  /**
   * Rendering the jsx
   * @return {jsx} Return jsx.
   */
  render() {
    const { items, classes } = this.props;
    const { isExpand } = this.state;
    const divHeight = isExpand ? `${287 * (items.length + 1)}px` : 0; // Max height equal items' number times each element's height(287px).

    return (
      <Fragment>
        {items.length !== 0 && (
          <Fragment>
            <div className={classes.flexBoxAround} style={{ maxHeight: divHeight }}>
              {items.map(item => <MenuItem key={item._id} item={item} />)}
            </div>
            <div className={classes.buttonDiv}>
              <Button color="primary" onClick={this.handleShowMoreClick}>{isExpand ? (<Fragment>Hide <ExpandLess /></Fragment>) : (<Fragment>Show More <ExpandMore /></Fragment>)}</Button>
            </div>
          </Fragment>
        )}
      </Fragment>);
  }
}
export default withStyles(styles)(HiddenItemPanel);
