class MainSearch {
    constructor(Recipes) {
        this.Recipes = Recipes
        this.$searchFormWrapper = document.querySelector('#search')
        this.$recipesWrapper = document.querySelector('.recipes-wrapper')
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
    }

    displayRecipes(Recipes) {
        this.clearRecipesWrapper()

        Recipes.forEach(Recipe => {
            const Template = new RecipeCard(Recipe)
            this.$recipesWrapper.appendChild(Template.createRecipeCard())
        })
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