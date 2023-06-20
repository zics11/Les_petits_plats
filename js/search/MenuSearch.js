class MenuSearch {
    constructor(Recipes) {
        this.Recipes = Recipes;
        this.$searchFormWrapper = document.querySelector('#search-ingredients');
        this.$recipesWrapper = document.querySelector('.recipes-wrapper');
        this.$menuListIngredientWrapper = document.querySelector('#menu-ingredients');
        this.$menuListApplianceWrapper = document.querySelector('#menu-appareils');
        this.$menuListUstensilsWrapper = document.querySelector('#menu-ustensiles');
    }

    search(query) {
        let SearchedRecipes = null;

        SearchedRecipes = this.Recipes.filter((Recipe) =>
            this.listIngredient(Recipe, query.toLowerCase())
        );

        this.displayRecipes(SearchedRecipes, query);
    }

    listIngredient(Recipe, query) {
        return Recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(query)
        );
    }

    clearRecipesWrapper() {
        this.$menuListIngredientWrapper.innerHTML = "";
    }

    displayRecipes(Recipes, query) {
        this.clearRecipesWrapper();

        const MenuList = new Menu(Recipes, 'ingredients');
        MenuList.insertMenuList(query);
    }

    onSearch() {
        this.$searchFormWrapper.addEventListener('input', (e) => {
            const query = e.target.value;
            if (query.length >= 3) {
                this.search(query);
            } else if (query.length === 0) {
                this.displayRecipes(this.Recipes, query);
            }
        });
    }
}
