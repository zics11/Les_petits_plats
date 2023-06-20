class MainSearch {
    constructor(Recipes) {
        this.Recipes = Recipes
        this.$searchFormWrapper = document.querySelector('#search')
        this.$recipesWrapper = document.querySelector('.recipes-wrapper')
        this.$menuListIngredientWrapper = document.querySelector('#menu-ingredients');
        this.$menuListApplianceWrapper = document.querySelector('#menu-appareils');
        this.$menuListUstensilsWrapper = document.querySelector('#menu-ustensiles');

    }

    search(query) {
        let SearchedRecipes = null

        SearchedRecipes = this.Recipes.filter((Recipe) =>
            Recipe.name.toLowerCase().includes(query.toLowerCase()) ||
            Recipe.description.toLowerCase().includes(query.toLowerCase()) ||
            this.listIngredient(Recipe, query.toLowerCase())

        )

        this.displayRecipes(SearchedRecipes)
    }

    listIngredient(Recipe, query) {
        return Recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(query)
        );
    }

    clearRecipesWrapper() {
        this.$recipesWrapper.innerHTML = ""
        this.$menuListIngredientWrapper.innerHTML = ""
        this.$menuListApplianceWrapper.innerHTML = ""
        this.$menuListUstensilsWrapper.innerHTML = ""
    }

    displayRecipes(Recipes) {
        this.clearRecipesWrapper()

        Recipes.forEach(Recipe => {
            const Template = new RecipeCard(Recipe)
            this.$recipesWrapper.appendChild(Template.createRecipeCard())
        })

        const MenuList = new Menu(Recipes, 'ingredients');
        MenuList.insertMenuList();

        const MenuListAppliance = new Menu(Recipes, 'appliance');
        MenuListAppliance.insertMenuList();
    
        const MenuListUstensils = new Menu(Recipes, 'ustensils');
        MenuListUstensils.insertMenuList();
    
    
    }

    onSearch() {
        this.$searchFormWrapper
            .addEventListener('keyup', e => {
                const query = e.target.value
                if (query.length >= 3) {
                    this.search(query)
                } else if (query.length === 0) {
                    this.displayRecipes(this.Recipes)
                }
            })
    }

}