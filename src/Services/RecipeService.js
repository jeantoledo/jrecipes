import axios from "axios";
import { MASTER_URL, ACCESS_TOKEN } from "./constants";
const contentType = "recipe";

// The logic of formatRecipesResult method could be a graphql layer in a more advanced application.
const formatRecipesResult = result => {
  const getTags = recipe => {
    if (recipe && recipe.fields && recipe.fields.tags) {
      return recipe.fields.tags.map(tag => {
        const tagInfo = result.data.includes.Entry.filter(
          entry => entry.sys.id === tag.sys.id
        )[0];

        return tagInfo ? tagInfo.fields.name : undefined;
      });
    }

    return [];
  };

  const getChef = recipe => {
    let chefInfo;
    if (recipe && recipe.fields && recipe.fields.chef) {
      chefInfo = result.data.includes.Entry.filter(
        entry => entry.sys.id === recipe.fields.chef.sys.id
      )[0];
    }

    return chefInfo ? chefInfo.fields.name : undefined;
  };

  return result.data.items.map(recipe => {
    const photo = result.data.includes.Asset.filter(
      asset => asset.sys.id === recipe.fields.photo.sys.id
    )[0];

    return {
      id: recipe.sys.id,
      title: recipe.fields.title,
      tags: getTags(recipe),
      description: recipe.fields.description,
      chef: getChef(recipe),
      photo: {
        title: photo.fields.title,
        url: photo.fields.file.url
      }
    };
  });
};

class RecipeService {
  static async all() {
    const recipesUrl = `${MASTER_URL}/entries?content_type=${contentType}&access_token=${ACCESS_TOKEN}&include=2`;
    // In a production scenario I think that is better to get details in another request avoiding get information that could not be used.
    const result = await axios.get(recipesUrl);

    return formatRecipesResult(result);
  }
}

export default RecipeService;
