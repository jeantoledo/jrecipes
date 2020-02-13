import React, { useState, useEffect } from "react";
import RecipeService from "../../Services/RecipeService";
import RecipeCard from "../RecipeCard";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    marginTop: "20px"
  },
  card: {
    marginRight: "20px",
    "&:last-of-type": {
      marginRight: "0"
    }
  }
}));

const RecipeList = () => {
  const classes = useStyles();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const loadRecipes = async () => {
      const recipes = await RecipeService.all();
      setRecipes(recipes);
    };

    loadRecipes();
  }, []);

  return recipes && recipes.length ? (
    <Container className={classes.container}>
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} className={classes.card} />
      ))}
    </Container>
  ) : null;
};

export default RecipeList;
