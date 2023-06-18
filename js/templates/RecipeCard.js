class RecipeCard {
    constructor(recipe) {
        this._recipe = recipe
        this.$wrapper = document.createElement('div')

    }

    get recipe(){
        return this._recipe
    }

    createRecipeCard() {
        const recipeCard =`
            <div class="recipe-thumbnail center">
                <img
                    src="${this._recipe.image}"
                />
                
            </div>
            `
        this.$wrapper.innerHTML = recipeCard

        return this.$wrapper
    }
}