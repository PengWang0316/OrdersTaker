import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Avatar, Typography, DialogContent, Button, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons/';

import PriceItem from './PriceItem';
import RecipePanel from './RecipePanel';
import dialogStyles from '../styles/DialogSytels';

const styles = ({
  ...dialogStyles,
  flexBox: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  avatar: {
    width: '150px',
    height: '150px',
    marginBottom: '8px',
    transition: 'all 0.4s',
    marginRight: 30
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  description: {
    maxWidth: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  buttonDiv: {
    textAlign: 'right',
    marginTop: 50
  },
  closeButton: {
    width: 30,
    height: 30,
    position: 'relative',
    top: -10,
    left: '98%'
  },
  closeIcon: {
    width: 20,
    height: 20
  },
  '@media (max-width: 923px)': {
    avatar: {
      width: '200px',
      height: '200px',
      marginBottom: 25,
      marginRight: 0
    }
  }
});

export const ItemDetailDialog = ({
  onClose, open, item, classes
}) => (
  <Dialog onClose={onClose} open={open} classes={{ paper: classes.dialogPaper }}>
    <DialogContent className={classes.dialogContent}>
      {item && (
        <Fragment>
          <IconButton onClick={onClose} className={classes.closeButton}><Close className={classes.closeIcon} /></IconButton>
          <div className={classes.flexBox}>
            <Avatar src={item.photo} className={classes.avatar} />
            <div className={classes.description}>
              <Typography color="primary" className={classes.title}>{item.name}</Typography>
              <Typography color="textSecondary">{item.description}</Typography>
              <PriceItem item={item} flexEnd />
            </div>
          </div>
          <RecipePanel recipes={item.recipes} />
          <div className={classes.buttonDiv}>
            <Button onClick={onClose} variant="contained" size="small" aria-label="Close the detail page" color="primary">Close</Button>
          </div>
        </Fragment>
      )}
    </DialogContent>
  </Dialog>
);
ItemDetailDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  item: PropTypes.object,
  classes: PropTypes.object.isRequired
};
ItemDetailDialog.defaultProps = { item: null };
export default withStyles(styles)(ItemDetailDialog);
