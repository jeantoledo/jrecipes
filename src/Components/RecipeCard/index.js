import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import RecipeViewer from "../RecipeViewer";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function RecipeCard({ recipe, className }) {
  const [open, setOpen] = React.useState(false);
  const [selectedRecipe, setSelectedRecipe] = React.useState(null);
  const classes = useStyles();

  const handleDetailsClick = recipe => {
    setOpen(true);
    setSelectedRecipe(recipe);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className={clsx(classes.root, className)}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          title={recipe.title}
        />
        <CardMedia
          className={classes.media}
          image={recipe.photo.url}
          title={recipe.photo.title}
        />
        <CardActions disableSpacing>
          <Button
            onClick={() => {
              handleDetailsClick(recipe);
            }}
            aria-label="Details"
            color="primary"
          >
            Details
          </Button>
        </CardActions>
      </Card>

      <RecipeViewer open={open} onClose={handleClose} recipe={selectedRecipe} />
    </>
  );
}
