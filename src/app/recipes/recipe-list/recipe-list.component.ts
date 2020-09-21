import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[];
  // @Output() showRecipe = new EventEmitter<Recipe>();
  constructor(private recipesService:RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
  }
  // onRecipeItemClicked(recipe: Recipe){
  //   this.showRecipe.emit(recipe);
  // }
}
