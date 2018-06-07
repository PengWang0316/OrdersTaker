import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';

import { fetchBasicInformation } from '../actions/BasicInformationActions';

const styles = {
  divPlaceHolder: {
    background: '#efefef',
    width: '100%',
    minHeight: '400px'
  },
  bigBanner: {
    width: '100%',
    maxHeight: '770px'
  },
  smallBanner: {
    width: '100%',
    maxHeight: '400px'
  },
  bannerText: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    position: 'relative',
    marginTop: '-25%',
    left: '20%'
  },
  title: {
    fontSize: '40px',
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    textShadow: '1px 1px 1px #909090'
  },
  subTitle: {
    color: 'white',
    fontSize: '24px',
    textAlign: 'center',
    textShadow: '1px 1px 1px #909090'
  },
  '@media (max-width: 600px)': {
    bannerText: { marginTop: '-43%' },
    title: { fontSize: '30px' },
    subTitle: { fontSize: '18px' },
    divPlaceHolder: { minHeight: '230px' }
  }
};

/**
 * The Component to show the banner image and title.
 */
export class Banner extends Component {
  /**
   * Call the redux action to get the basic infomariont.
   * @param {object} props contains this component's prop values;
   * @return {null} No return.
   */
  constructor(props) {
    super(props);
    if (!props.basicInformation) props.fetchBasicInformation();
  }

  /**
   * Render the jsx for the component.
   * @return {jsx} Return the jsx.
   */
  render() {
    const { classes, basicInformation } = this.props;
    return (
      <div className={basicInformation ? '' : classes.divPlaceHolder}>
        {basicInformation &&
          <Fragment>
            <Hidden only="xs">
              <img alt="Big Banner" src={basicInformation.banners[0].url} className={classes.bigBanner} />
            </Hidden>
            <Hidden only={['lg', 'md', 'sm']}>
              <img alt="Small Banner" src={basicInformation.banners[0].xsUrl} className={classes.smallBanner} />
            </Hidden>
            <div className={classes.bannerText}>
              <div className={classes.title}>{basicInformation.banners[0].title}</div>
              <div className={classes.subTitle}>{basicInformation.banners[0].subTitle}</div>
            </div>
          </Fragment>}
      </div>
    );
  }
}
const mapStateToProps = ({ basicInformation }) => ({ basicInformation });
const mapDispatchToProps = dispatch => ({
  fetchBasicInformation: () => dispatch(fetchBasicInformation())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Banner));
