// eslint-disable-next-line no-unused-vars
class RecipeCard {
    constructor(recipe) {
        this._recipe = recipe
        this.$wrapper = document.createElement('div')
        this.$wrapper.classList.add('recipe')
    }

    get recipe() {
        return this._recipe
    }

    createRecipeCard() {
        const ingredientsList = this._recipe.ingredients.map(ingredient => {
            let ingredientString = `<div class="ingredient"><h4>${ingredient.ingredient}</h4>`;
            if (ingredient.quantity) {
                ingredientString += `<p>${ingredient.quantity}`;
                if (ingredient.unit) {
                    ingredientString += ` ${ingredient.unit}`;
                }
                ingredientString += `</p>`;
            }
            ingredientString += `</div>`;
            return ingredientString;
        }).join('');

        const recipeCard = `
            <img src="${this._recipe.image}" />
            <div class="time">
            ${this._recipe.time} min
            </div>
            <div class="recipe_description">
                <h2>${this._recipe.name}</h2>
                <h3>RECETTE</h3>
                <p class="recipe_description_text">
                    ${this._recipe.description}
                </p>
                <h3>INGRÉDIENTS</h3>
                <div class="ingredients_list">
                    ${ingredientsList}
                </div>
            </div>
        `
        this.$wrapper.innerHTML = recipeCard

        return this.$wrapper
    }
}