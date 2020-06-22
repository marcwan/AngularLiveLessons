import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from '../../services/recipe.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes_loaded: boolean;
  load_error: object;
  recipes: Recipe[];

  constructor(private router: Router,
    private recipe_service: RecipeService) { }

  ngOnInit() {
    this.recipe_service.getAllRecipes()
      .subscribe(
        (recipepayload) => {
          this.recipes = recipepayload.data;
          this.recipes_loaded = true;
          console.log(recipepayload.error);
        },
        (error) => {
          this.load_error = error;
          console.log(JSON.stringify(error, null, 2));
        }
      );
  }

  recipeClicked(recipe_id): void {
    this.router.navigateByUrl('/recipes/' + recipe_id);
  }

  addNewRecipeClicked(): void {
    this.router.navigateByUrl('/editnewrecipe');
  }

}
