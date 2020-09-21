import { Injectable } from "@angular/core";

import  { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

@Injectable({providedIn:'root'})
export class ShoppingService {
    ingredientCreated = new EventEmitter<Ingredient>();
    addRecipeIngredients = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[]= [
        new Ingredient('Apple',5),
        new Ingredient('Tomatoes',10)
      ];

    getIngredients() {
        return this.ingredients.slice();//only a copy
    }
    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients)
        this.addRecipeIngredients.emit(this.ingredients.slice());
    }
}