import { Ingredient } from '../shared/ingredient.model'

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    //在html中refer用这些名字，而不是下面的constructor argument names
    
    constructor(name:string, desc:string, imagePath: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}