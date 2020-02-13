import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  recipePhoto: {
    width: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  tag: {
    marginRight: "5px"
  }
}));

const RecipeViewer = props => {
  const { open, recipe, onClose } = props;
  const classes = useStyles();

  if (recipe) {
    const SubHeader = () => (
      <>
        {recipe.tags &&
          recipe.tags.map(tag => (
            <Chip
              key={tag}
              size="small"
              color="primary"
              label={tag}
              className={classes.tag}
            />
          ))}
        {Boolean(recipe.tags.length) && <br />}
        {clsx(recipe.chef && `by ${recipe.chef || ""}`)}
      </>
    );

    return (
      <Dialog
        onClose={onClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <Card className={classes.root}>
          <CardHeader title={recipe.title} subheader={<SubHeader />} />
          <CardMedia
            className={classes.media}
            image={recipe.photo.url}
            title={recipe.photo.title}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {recipe.description}
            </Typography>
          </CardContent>
        </Card>
      </Dialog>
    );
  }

  return null;
};

RecipeViewer.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default RecipeViewer;
