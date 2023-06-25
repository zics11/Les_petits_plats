class MainSearch {
    constructor(Recipes) {
        this.Recipes = Recipes
        this.$searchFormWrapper = document.querySelector('#search')
        this.$recipesWrapper = document.querySelector('.recipes-wrapper')
        this.$listIngredientWrapper = document.querySelector('#list-ingredients');
        this.$listApplianceWrapper = document.querySelector('#list-appareils');
        this.$listUstensilsWrapper = document.querySelector('#list-ustensiles');
        this.$selectedFilterIngredient = []
        this.$selectedFilterAppliance = []
        this.$selectedFilterUstensils = []


    }

    updateFilters(category, item) {
        const selectFilterWrapperMap = {
            ingredients: this.$selectedFilterIngredient,
            appliance: this.$selectedFilterAppliance,
            ustensils: this.$selectedFilterUstensils
        };
        console.log("category", category)
        console.log("item", item)

        selectFilterWrapperMap[category].push(item)
        console.log("this.$selectedFilterUstensils", this.$selectedFilterUstensils)
        console.log("this.$selectedFilterAppliance", this.$selectedFilterAppliance)
        console.log("this.$selectedFilterIngredient", this.$selectedFilterIngredient)

        const query = this.$searchFormWrapper.value;

        // Exécuter la recherche avec les filtres mis à jour
        this.search(query);
    }


    search(query) {
        let SearchedRecipes = null

        SearchedRecipes = this.Recipes.filter((Recipe) =>
            Recipe.name.toLowerCase().includes(query.toLowerCase()) ||
            Recipe.description.toLowerCase().includes(query.toLowerCase()) ||
            this.listIngredient(Recipe, query.toLowerCase())
        )

        this.filterSearch(SearchedRecipes)
    }

    filterSearch(searchedRecipes) {
        let filterSearchedRecipes = null;
        console.log("searchedRecipes", searchedRecipes)
        filterSearchedRecipes = searchedRecipes.filter((Recipe) =>
            this.$selectedFilterAppliance.every((appliance) =>
                Recipe.appliance.toLowerCase().includes(appliance.toLowerCase())
            ) &&
            this.$selectedFilterIngredient.every((ingredient) =>
                Recipe.ingredients.some((item) =>
                    item.ingredient.toLowerCase().includes(ingredient.toLowerCase())
                )
            ) &&
            this.$selectedFilterUstensils.every((ustensil) =>
                Recipe.ustensils.some((item) =>
                    item.toLowerCase().includes(ustensil.toLowerCase())
                ))
        );
        console.log("filterSearchedRecipes", filterSearchedRecipes)
        this.displayRecipes(filterSearchedRecipes);
    }

    listIngredient(Recipe, query) {
        return Recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(query)
        );
    }

    displayRecipes(Recipes) {
        this.$recipesWrapper.innerHTML = ""

        Recipes.forEach(Recipe => {
            const Template = new RecipeCard(Recipe)
            this.$recipesWrapper.appendChild(Template.createRecipeCard())
        })
        console.log("recipezs display", Recipes)

        if (this.$selectedFilterIngredient.length===0 && this.$selectedFilterAppliance.length===0 && this.$selectedFilterUstensils.length===0) {
            this.displayMenu(Recipes)
        }

    }

    displayMenu(Recipes) {
        this.$listIngredientWrapper.innerHTML = ""
        this.$listApplianceWrapper.innerHTML = ""
        this.$listUstensilsWrapper.innerHTML = ""

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