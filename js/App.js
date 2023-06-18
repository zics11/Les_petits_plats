// // Faites une requête HTTP pour charger le fichier JSON
// fetch('data/recipes.json')
//   .then(response => response.json())
//   .then(data => {
//     // Le contenu JSON est disponible dans la variable "data"

//     // Créez un tableau vide pour stocker les ingrédients
//     let allIngredients = [];

//     // Parcourez toutes les recettes
//     data.recipes.forEach((recipe) => {
//       // Parcourez tous les ingrédients de chaque recette
//       recipe.ingredients.forEach((ingredientObj) => {
//         let ingredient = ingredientObj.ingredient;

//         // Vérifiez si l'ingrédient n'est pas déjà présent dans le tableau
//         if (!allIngredients.includes(ingredient)) {
//           // Ajoutez l'ingrédient au tableau
//           allIngredients.push(ingredient);
//         }
//       });
//     });

//     // Affichez la liste de tous les ingrédients
//     console.log(allIngredients);
//   })


class App {
  constructor() {
    this.$recipesWrapper = document.querySelector('.recipes-wrapper')

    this.dataUrl = '/data/recipes.json'
    this.Recipes = []
  }

  async getRecipes() {
    const response = await fetch(this.dataUrl);
    const data = await response.json();
    const recipesData = data.recipes;
    this.Recipes = recipesData.map(recipeData => new modelsRecipe(recipeData));
  }

  async main() {
    await this.getRecipes()

    this.Recipes.forEach(recipe => {
      const Template = new RecipeCard(recipe)
    
      console.log('temlate', Template)


      this.$recipesWrapper.appendChild(
        Template.createRecipeCard()
      )
    })

  }

}

const app = new App()

app.main()
