import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping-list.service'

@Injectable({ providedIn: 'root' })
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Beef and Mushrooms with Smashed Potatoes Recipe',
         'A traditional french meal',
          'https://p0.pikist.com/photos/496/922/mushrooms-french-dish-tjena-kitchen-recipe-beef-with-mushrooms-chili-pepper-ready-cooked-meals-food-gastronomy.jpg',
          [new Ingredient('beef', 1), new Ingredient('mushrooms', 6)]),
        new Recipe('Chorizo & mozzarella gnocchi bake',
         'Upgrade cheesy tomato pasta with gnocchi, chorizo and mozzarella',
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872',
        [new Ingredient('tomato', 5), new Ingredient('pasta', 1)])
    ];

    constructor (private slService: ShoppingService) {}
    
    getRecipes() {
        return this.recipes.slice();//only a copy
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }
}