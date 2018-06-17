import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ExpandMore } from '@material-ui/icons';

const styles = ({
  recipe: {
    fontWeight: 'bold',
    fontSize: 14
  },
  panel: {
    boxShadow: 'none',
    marginTop: 40
  },
  list: {
    width: '100%'
  },
  listText: {
    fontSize: 12
  }
});

export const RecipePanel = ({ recipes, classes }) => (
  <ExpansionPanel classes={{ root: classes.panel }}>
    <ExpansionPanelSummary expandIcon={<ExpandMore color="primary" />}>
      <Typography color="primary" className={classes.recipe}>Recipe</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <List className={classes.list}>
        {recipes.map(recipe => (
          <Fragment key={`${recipe}_${Math.random()}`}>
            <ListItem button>
              <ListItemText disableTypography primary={<Typography color="textSecondary" className={classes.ListItemText}>{recipe}</Typography>} />
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);
RecipePanel.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(RecipePanel);
