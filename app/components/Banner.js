import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';

const styles = {
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
    subTitle: { fontSize: '18px' }
  }
};

export const Banner = ({ classes }) => (
  <div>
    <Hidden only="xs">
      <img alt="Big Banner" src="http://res.cloudinary.com/orderstaker/image/upload/c_crop,h_770,q_auto:eco,w_2000,y_322/v1528139518/banner/restaurant-shot.jpg" className={classes.bigBanner} />
    </Hidden>
    <Hidden only={['lg', 'md', 'sm']}>
      <img alt="Small Banner" src="http://res.cloudinary.com/orderstaker/image/upload/c_fit,h_400,w_600/v1528139518/banner/restaurant-shot.jpg" className={classes.smallBanner} />
    </Hidden>
    <div className={classes.bannerText}>
      <div className={classes.title}>This is the Title</div>
      <div className={classes.subTitle}>
        We should say somethink here to demostrate the subtitle
      </div>
    </div>
  </div>
);
export default withStyles(styles)(Banner);
