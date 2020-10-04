import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingService} from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number
  constructor(private shoppingService:ShoppingService, private recipeService:RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  addToShoppingList() {
    this.shoppingService.addIngredients(this.recipe.ingredients);
  }
  
  removeFromRecipeList() {
    this.recipeService.removeRecipe(this.id);
    this.router.navigate(['/recipes']);//this removes the remaining recipe detail screen of the deleted recipe
  }
}
