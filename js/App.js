
class App {
  constructor() {
    this.$recipesWrapper = document.querySelector('.recipes-wrapper')
    this.dataUrl = 'data/recipes.json'
    this.Recipes = []
  }

  async getRecipes() {
    const response = await fetch(this.dataUrl);
    const data = await response.json();
    const recipesData = data.recipes;
    const recipes = [];

    for (const recipeData of recipesData) {
      recipes.push(new modelsRecipe(recipeData));
    }

    this.Recipes = recipes;
    return this.Recipes;
  }

  async main() {
    await this.getRecipes()

    // Crée une instance de MainSearch en lui passant les recettes
    const Search = new MainSearch(this.Recipes)
    Search.onSearch()
    Search.countRecipes(this.Recipes)

    // Crée une instance de MenuSearch pour la recherche par ingrédients, appliance et ustensiles
    const menuSearchIngredient = new MenuSearch(this.Recipes, 'ingredients')
    menuSearchIngredient.onSearch()

    const menuSearchAppliance = new MenuSearch(this.Recipes, 'appliance')
    menuSearchAppliance.onSearch()

    const menuSearchUstensils = new MenuSearch(this.Recipes, 'ustensils')
    menuSearchUstensils.onSearch()

    // Parcourt les recettes et crée une instance de RecipeCard pour chaque recette
    this.Recipes.forEach(recipe => {
      const Template = new RecipeCard(recipe)
      this.$recipesWrapper.appendChild(
        Template.createRecipeCard()
      )
    })

    // Crée une instance de Menu ingredients, appliance et ustensils
    const MenuListIngredient = new Menu(this.Recipes, 'ingredients');
    MenuListIngredient.insertMenuList();
    MenuListIngredient.toggleMenu();

    const MenuListAppliance = new Menu(this.Recipes, 'appliance');
    MenuListAppliance.insertMenuList();
    MenuListAppliance.toggleMenu();

    const MenuListUstensils = new Menu(this.Recipes, 'ustensils');
    MenuListUstensils.insertMenuList();
    MenuListUstensils.toggleMenu();
  }
  async initRecipes() {
    await this.getRecipes()

    // Crée une instance de MainSearch en lui passant les recettes
    const Search = new MainSearch(this.Recipes)
    Search.search()
  }


}

const app = new App()
app.main()