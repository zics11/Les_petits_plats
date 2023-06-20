
class App {
  constructor() {
    this.$recipesWrapper = document.querySelector('.recipes-wrapper')
    this.$menuListIngredientWrapper = document.querySelector('#menu-ingredients')
    this.dataUrl = '/data/recipes.json'
    this.Recipes = []
  }

  async getRecipes() {
    const response = await fetch(this.dataUrl);
    const data = await response.json();
    const recipesData = data.recipes;
    this.Recipes = recipesData.map(recipeData => new modelsRecipe(recipeData));
    return this.Recipes
  }

  async main() {
    await this.getRecipes()

    const Search = new MainSearch(this.Recipes)
    Search.onSearch()

    this.Recipes.forEach(recipe => {
      const Template = new RecipeCard(recipe)
      this.$recipesWrapper.appendChild(
        Template.createRecipeCard()
      )
    })

    const MenuList = new Menu(this.Recipes, 'ingredients');
    MenuList.insertMenuList();

    console.log("list", MenuList.listIngredients())


  }

}

const app = new App()

app.main()

console.log('main', app.getRecipes())
