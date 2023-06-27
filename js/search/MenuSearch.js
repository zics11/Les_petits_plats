class MenuSearch {
    constructor(Recipes, Property) {
        this.Recipes = Recipes;
        this.Property = Property
        this.$searchImputIngredientWrapper = document.querySelector('#search-ingredients');
        this.$searchImputApplianceWrapper = document.querySelector('#search-appareils');
        this.$searchImputUstensilsWrapper = document.querySelector('#search-ustensiles');
        this.$recipesIngredientWrapper = document.querySelector('.recipes-wrapper');
        this.$listIngredientWrapper = document.querySelector('#list-ingredients');
        this.$listApplianceWrapper = document.querySelector('#list-appareils');
        this.$listUstensilsWrapper = document.querySelector('#list-ustensiles');
    }

    search(query) {
        let SearchedItem = null;

        SearchedItem = this.Recipes.filter((Recipe) =>
            this.listItem(Recipe, query.toLowerCase())
        );

        this.displayList(SearchedItem, query);
    }

    listItem(Recipe, query) {
        if (this.Property === 'ingredients') {
            return Recipe.ingredients.some((ingredient) =>
                ingredient.ingredient.toLowerCase().includes(query)
            );
        } else if (this.Property === 'appliance') {
            return Recipe.appliance.toLowerCase().includes(query);
        } else if (this.Property === 'ustensils') {
            return Recipe.ustensils.some((ustensil) =>
                ustensil.toLowerCase().includes(query)
            );
        }
    }

    clearListWrapper() {
        const listhWrapperMap = {
            ingredients: this.$listIngredientWrapper,
            appliance: this.$listApplianceWrapper,
            ustensils: this.$listUstensilsWrapper
        };

        listhWrapperMap[this.Property].innerHTML = "";
    }

    displayList(Recipes, query) {
        this.clearListWrapper();

        const MenuList = new Menu(Recipes, this.Property);
        MenuList.insertMenuList(query);
    }

    onSearch() {
        const searchWrapperMap = {
            ingredients: this.$searchImputIngredientWrapper,
            appliance: this.$searchImputApplianceWrapper,
            ustensils: this.$searchImputUstensilsWrapper
        };

        searchWrapperMap[this.Property].addEventListener('input', (e) => {
            const query = e.target.value;
            if (query.length >= 3) {
                this.search(query);
            } else if (query.length === 0) {
                this.displayList(this.Recipes, query);
            }
        });
    }
}
