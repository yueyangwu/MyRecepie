import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping-list.service'
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    
    // private recipes: Recipe[] = [
    //     new Recipe('Beef and Mushrooms with Smashed Potatoes Recipe',
    //      'A traditional french meal',
    //       'https://p0.pikist.com/photos/496/922/mushrooms-french-dish-tjena-kitchen-recipe-beef-with-mushrooms-chili-pepper-ready-cooked-meals-food-gastronomy.jpg',
    //       [new Ingredient('beef', 1), new Ingredient('mushrooms', 6)]),
    //     new Recipe('Chorizo & mozzarella gnocchi bake',
    //      'Upgrade cheesy tomato pasta with gnocchi, chorizo and mozzarella',
    //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872',
    //     [new Ingredient('tomato', 5), new Ingredient('pasta', 1)])
    // ];
    
    private recipes: Recipe[] = [];

    constructor (private slService: ShoppingService) {}
    
    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
        //remove the default recipes and grab the recipes from http
    }
    
    getRecipes() {
        return this.recipes.slice();//only a copy
    }

    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());//because getRecipes() is returning a copy, new changes is not reflected
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());//because getRecipes() is returning a copy, new changes is not reflected
    }

    removeRecipe(index:number) {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}