import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import {Recipe} from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({providedIn:"root"})
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService) {}
    //resolve method will find out when the data returned so no need to have the .subscribe. resolver load data before the page is loaded
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipesService.getRecipes();

        if (recipes.length === 0) {
            return this.dataStorageService.fetchRecipes();
        } //if we already have fetched recipes before, we don't need to fetch again so that our edits can be saved. If we don't have recipes we need to fetch
        else {
            return recipes;
        }
    }
}