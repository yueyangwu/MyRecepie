import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: "root" })
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://ng-course-recipe-book-94cf1.firebaseio.com/recipes.json', recipes).subscribe(res => {
            console.log(res);
        });
    }
    //put will overwrite all data stored in database. recipes.json is the folder name.

    fetchRecipes() {
        return this.http
            .get<Recipe[]>('https://ng-course-recipe-book-94cf1.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };//if the recipe saved doesn't have ingredients we put an empty array there
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            )
    }

}