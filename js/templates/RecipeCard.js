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
        let ingredientsList = '';
        for (let i = 0; i < this._recipe.ingredients.length; i++) {
            const ingredient = this._recipe.ingredients[i];
            let ingredientString = `<div class="ingredient"><h4>${ingredient.ingredient}</h4>`;
            if (ingredient.quantity) {
                ingredientString += `<p>${ingredient.quantity}`;
                if (ingredient.unit) {
                    ingredientString += ` ${ingredient.unit}`;
                }
                ingredientString += `</p>`;
            }
            ingredientString += `</div>`;
            ingredientsList += ingredientString;
        }

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
        `;

        this.$wrapper.innerHTML = recipeCard;

        return this.$wrapper;
    }
}