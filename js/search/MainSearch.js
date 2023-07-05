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
        this.$countRecipesWrapper = document.querySelector('#count-recipes')
    }

    // filtre les recettes par rapport a la saisie dans le champ de recherche
    search(query = this.$searchFormWrapper.value) {
        let searchedRecipes = [];

        for (const Recipe of this.Recipes) {
            const lowerCaseQuery = query.toLowerCase();
            const recipeName = Recipe.name.toLowerCase();
            const recipeDescription = Recipe.description.toLowerCase();

            if (
                recipeName.includes(lowerCaseQuery) ||
                recipeDescription.includes(lowerCaseQuery) ||
                this.listIngredient(Recipe, lowerCaseQuery)
            ) {
                searchedRecipes.push(Recipe);
            }
        }

        if (searchedRecipes.length === 0) {
            this.noRecipesMessage();
            this.filterSearch(searchedRecipes);
        } else {
            this.$messageWrapper.innerHTML = '';
            this.filterSearch(searchedRecipes);
        }
    }

    //filtre les recette par rapport au tag selectioné  
    filterSearch(searchedRecipes) {
        this.updateFilters()

        let filterSearchedRecipes = null;

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

        this.displayRecipes(filterSearchedRecipes);
    }

    // Met à jour les variables des filtre en allan chercher dans #list_label-search
    updateFilters() {
        const listLabelSearch = document.querySelector('#list_label-search');


        this.$selectedFilterIngredient = [];
        this.$selectedFilterAppliance = [];
        this.$selectedFilterUstensils = [];

        const ingredients = listLabelSearch.querySelectorAll('.ingredients');
        for (const ingredient of ingredients) {
            this.$selectedFilterIngredient.push(ingredient.textContent);
        }

        const appliances = listLabelSearch.querySelectorAll('.appliance');
        for (const appliance of appliances) {
            this.$selectedFilterAppliance.push(appliance.textContent);
        }

        const ustensils = listLabelSearch.querySelectorAll('.ustensils');
        for (const ustensil of ustensils) {
            this.$selectedFilterUstensils.push(ustensil.textContent);
        }
    }

    // retourne la liste des ingrédients par par rapport au recettes affichés
    listIngredient(Recipe, query) {
        return Recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(query)
        );
    }

    // affiche les recettes
    displayRecipes(Recipes) {
        this.$recipesWrapper.innerHTML = ""
        this.countRecipes(Recipes)

        Recipes.forEach(Recipe => {
            const Template = new RecipeCard(Recipe)
            this.$recipesWrapper.appendChild(Template.createRecipeCard())
        })

        this.displayMenu(Recipes)
    }

    // affiche les listes des menus
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

        const menuSearchIngredient = new MenuSearch(Recipes, 'ingredients')
        menuSearchIngredient.onSearch()
        menuSearchIngredient.clearImput()

        const menuSearchAppliance = new MenuSearch(Recipes, 'appliance')
        menuSearchAppliance.onSearch()


        const menuSearchUstensils = new MenuSearch(Recipes, 'ustensils')
        menuSearchUstensils.onSearch()

    }
    // déclenche la recherche quant une saisie est faite dans le champ de recherche
    onSearch() {
        this.$searchFormWrapper
            .addEventListener('keyup', e => {
                const query = e.target.value
                if (query.length >= 3) {
                    this.search(query)
                } else if (query.length === 0) {
                    this.filterSearch(this.Recipes)
                }
            })
    }

    // affiche un message si aucune recette n'est trouvé
    noRecipesMessage() {
        const message = `
        <p>Aucune recette ne contient <span>${this.$searchFormWrapper.value}</span> vous pouvez chercher « tarte aux pommes », « poisson », etc ...
    </p>
    `
        this.$messageWrapper.innerHTML = ''
        this.$messageWrapper.innerHTML = message
    }
    // compte le nombre de recette affiché
    countRecipes(recipes) {
        const countRecipe = recipes.length
        const message = `<p>${countRecipe} recettes</p>`

        this.$countRecipesWrapper.innerHTML = ''
        this.$countRecipesWrapper.innerHTML = message
    }
}