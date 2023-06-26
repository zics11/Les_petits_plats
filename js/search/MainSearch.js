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
        this.$messageWrapper = document.querySelector('#no-recipes')
    }


    search(query = this.$searchFormWrapper.value) {
        let SearchedRecipes = null

        SearchedRecipes = this.Recipes.filter((Recipe) =>
            Recipe.name.toLowerCase().includes(query.toLowerCase()) ||
            Recipe.description.toLowerCase().includes(query.toLowerCase()) ||
            this.listIngredient(Recipe, query.toLowerCase())
        )

        if (SearchedRecipes.length === 0) {
            this.noRecipesMessage()
            this.filterSearch(SearchedRecipes)
        } else {
            this.$messageWrapper.innerHTML = ''
            this.filterSearch(SearchedRecipes)
        }
    }

    filterSearch(searchedRecipes) {
        let filterSearchedRecipes = null;
        this.updateFilters()
        console.log("searchedRecipes", searchedRecipes)

        console.log("$selectedFilterIngredient", this.$selectedFilterIngredient)
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

    updateFilters() {

        const listLabelSearch = document.querySelector('#list_label-search');
        this.$selectedFilterIngredient = Array.from(listLabelSearch.querySelectorAll('.ingredients')).map(element => element.textContent);
        this.$selectedFilterAppliance = Array.from(listLabelSearch.querySelectorAll('.appliance')).map(element => element.textContent);
        this.$selectedFilterUstensils = Array.from(listLabelSearch.querySelectorAll('.ustensils')).map(element => element.textContent);
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
        this.displayMenu(Recipes)

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

    noRecipesMessage() {
        const message = `
        <p>Aucune recette ne contient <span>${this.$searchFormWrapper.value}</span> vous pouvez chercher « tarte aux pommes », « poisson », etc ...
    </p>
    `
        this.$messageWrapper.innerHTML = ''
        this.$messageWrapper.innerHTML = message

    }

}