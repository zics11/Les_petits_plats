class modelsRecipe {
    constructor(recipes){
        this._id = recipes.id
        this._image = recipes.image
        this._ingredients = recipes.ingredients
        this._time = recipes.time
        this._description = recipes.description
        this._appliance = recipes.appliance
        this._ustensils = recipes.ustensils

    }

    get id() {
        return this._id
    }

    get image() {
        return `/assets/recipes/${this._image}`
    }

    get ingredients() {
        return this._ingredients
    }
}