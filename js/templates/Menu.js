class Menu {
    constructor(recipes, property) {
        this._recipes = recipes;
        this._property = property;
        this.$wrapper = document.createElement('li');
        this.$menuListIngredientWrapper = document.querySelector('#menu-ingredients');
        this.$menuListApplianceWrapper = document.querySelector('#menu-appareils');
        this.$menuListUstensilsWrapper = document.querySelector('#menu-ustensiles');

    }

    list() {
        const allItem = new Set();

        this._recipes.forEach((recipe) => {
            if (this._property === 'ingredients') {
                recipe.ingredients.forEach((ingredientObj) => {
                    if (ingredientObj.ingredient) {
                        allItem.add(ingredientObj.ingredient);
                    }
                });
            } else if (this._property === 'appliance') {
                allItem.add(recipe.appliance);
            } else if (this._property === 'ustensils') {
                recipe.ustensils.forEach((ustensil) => {
                    allItem.add(ustensil);
                });
            }
        });

        return Array.from(allItem);
    }

    insertMenuList() {
        const MenuList = this.list()
            .map((item) => `<li>${item}</li>`)
            .join('');

        this.$wrapper.innerHTML = MenuList;
        if (this._property === 'ingredients') {
            this.$menuListIngredientWrapper.appendChild(this.$wrapper);
        }
        if (this._property === 'appliance') {
            this.$menuListApplianceWrapper.appendChild(this.$wrapper);
        }
        if (this._property === 'ustensils') {
            this.$menuListUstensilsWrapper.appendChild(this.$wrapper);
        }

        return this.$wrapper;
    }
}
