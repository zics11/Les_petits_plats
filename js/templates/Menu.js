class Menu {
    constructor(recipes, property) {
        this._recipes = recipes;
        this._property = property;
        this.$wrapper = document.createElement('li');
        this.$listIngredientWrapper = document.querySelector('#list-ingredients');
        this.$listApplianceWrapper = document.querySelector('#list-appareils');
        this.$listUstensilsWrapper = document.querySelector('#list-ustensiles');
        this.$butttonIngredientWrapper = document.querySelector('#btn-ingredients');
        this.$butttontApplianceWrapper = document.querySelector('#btn-appareils');
        this.$butttonUstensilsWrapper = document.querySelector('#btn-ustensiles');
        this.$menuIngredientWrapper = document.querySelector('#menu-ingredients');
        this.$menuApplianceWrapper = document.querySelector('#menu-appareils');
        this.$menuUstensilsWrapper = document.querySelector('#menu-ustensiles');
        this.$selectedIngredientWrapper = document.querySelector('#item-selected-ingredients');
        this.$selectedApplianceWrapper = document.querySelector('#item-selected-appareils');
        this.$selectedUstensilsWrapper = document.querySelector('#item-selected-ustensiles');
        this.$itemSelectedWrapper = document.querySelector('#item-selected');
        this.$labelSearchWrapper = document.querySelector('#list_label-search');



    }

    toggleMenu() {
        let isOpen = false; // Variable de statut pour suivre l'état du menu

        const buttonWrapperMap = {
            ingredients: this.$butttonIngredientWrapper,
            appliance: this.$butttontApplianceWrapper,
            ustensils: this.$butttonUstensilsWrapper
        };

        const menuWrapperMap = {
            ingredients: this.$menuIngredientWrapper,
            appliance: this.$menuApplianceWrapper,
            ustensils: this.$menuUstensilsWrapper
        };

        buttonWrapperMap[this._property].addEventListener('click', () => {
            isOpen = !isOpen; // Inversion de l'état du menu

            if (isOpen) {
                menuWrapperMap[this._property].style.display = 'block'; // Ouverture du menu
                buttonWrapperMap[this._property].classList.remove('open')

            } else {
                menuWrapperMap[this._property].style.display = 'none'; // Fermeture du menu
                buttonWrapperMap[this._property].classList.add('open')

            }
        });
    }

    selectItem() {
        const menuItems = this.$wrapper.querySelectorAll('li');
        const than = this; // Pour référencer l'instance de Menu à l'intérieur de la fonction de rappel

        menuItems.forEach((item) => {
            item.addEventListener('click', () => {
                than.moveItemToSelected(item);
            });
        });
    }

    moveItemToSelected(item) {
        item.remove();

        const listhWrapperMap = {
            ingredients: this.$selectedIngredientWrapper,
            appliance: this.$selectedApplianceWrapper,
            ustensils: this.$selectedUstensilsWrapper
        };

        const selectedItem = document.createElement('span');
        const selectedItemClone = document.createElement('span');

        selectedItem.textContent = item.textContent;
        selectedItemClone.textContent = item.textContent;


        selectedItem.addEventListener('click', () => {
            this.removeSelectedItem(selectedItem, selectedItemClone);
        });
        selectedItemClone.addEventListener('click', () => {
            this.removeSelectedItem(selectedItem, selectedItemClone);
        });


        listhWrapperMap[this._property].appendChild(selectedItem);
        this.$labelSearchWrapper.appendChild(selectedItemClone);

    }

    removeSelectedItem(selectedItem, selectedItemClone) {
        const itemText = selectedItem.textContent;
        selectedItem.remove();
        selectedItemClone.remove();

        const menuWrapperMap = {
            ingredients: this.$menuIngredientWrapper,
            appliance: this.$menuApplianceWrapper,
            ustensils: this.$menuUstensilsWrapper
        };

        const listWrapperMap = {
            ingredients: this.$listIngredientWrapper,
            appliance: this.$listApplianceWrapper,
            ustensils: this.$listUstensilsWrapper
        };

        // Créer un nouvel élément li pour réinsérer l'élément supprimé dans la liste d'origine
        const listItem = document.createElement('li');
        listItem.textContent = itemText;

        // Ajouter l'événement de clic pour sélectionner à nouveau l'élément
        listItem.addEventListener('click', () => {
            this.moveItemToSelected(listItem);
        });

        listWrapperMap[this._property].appendChild(listItem);
    }



    list() {
        const allItem = new Set();

        this._recipes.forEach((recipe) => {
            if (this._property === 'ingredients') {
                recipe.ingredients.forEach((ingredientObj) => {
                    if (ingredientObj.ingredient.toLowerCase().includes(this.query.toLowerCase())) {
                        allItem.add(ingredientObj.ingredient);
                    }
                });
            } else if (this._property === 'appliance') {
                if (recipe.appliance.toLowerCase().includes(this.query.toLowerCase())) {
                    allItem.add(recipe.appliance);
                }
            } else if (this._property === 'ustensils') {
                recipe.ustensils.forEach((ustensil) => {
                    if (ustensil.toLowerCase().includes(this.query.toLowerCase())) {
                        allItem.add(ustensil);
                    }
                });
            }
        });

        return Array.from(allItem);
    }

    insertMenuList(query = '') {
        this.query = query;
        const filteredItems = this.list(query);

        const MenuList = filteredItems
            .map((item) => `<li>${item}</li>`)
            .join('');

        this.$wrapper.innerHTML = MenuList;

        if (this._property === 'ingredients') {
            this.$listIngredientWrapper.innerHTML = '';
            this.$listIngredientWrapper.appendChild(this.$wrapper);
        } else if (this._property === 'appliance') {
            this.$listApplianceWrapper.innerHTML = '';
            this.$listApplianceWrapper.appendChild(this.$wrapper);
        } else if (this._property === 'ustensils') {
            this.$listUstensilsWrapper.innerHTML = '';
            this.$listUstensilsWrapper.appendChild(this.$wrapper);
        }
        this.selectItem(); // Ajouter les événements de clic aux éléments de la liste
        return this.$wrapper;
    }
}
