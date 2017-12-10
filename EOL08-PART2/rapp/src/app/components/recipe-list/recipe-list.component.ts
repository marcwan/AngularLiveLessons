import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Recipe } from '../../model/recipe';
import { RecipeService } from '../../services/recipe.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  current_classes: any;

  current_styles: any;

  recipes: Recipe[];
  recipes_loaded: boolean;

  load_error: boolean;
  error_text: string;

  recipe_in_progress: Recipe;

  constructor(private router: Router,
    private recipe_service: RecipeService) {

    this.current_classes = { 'darkbg': false };
    this.current_styles = { 'font-size': '150%' };

    this.load_error = false;
  }

  ngOnInit() {
    this.recipe_service.getAllRecipes()
      .then((recipes) => {
        this.recipes = recipes;
        this.recipes_loaded = true;
      })
      .catch((err) => {
        this.load_error = true;
        const body = JSON.parse(err._body);
        this.error_text = body.message;
      });
  }

  public addRecipeClicked() {
    console.log(JSON.stringify(this.recipe_in_progress, null, 2));
    this.recipes.unshift(this.recipe_in_progress);
    this.recipe_in_progress = Recipe.createBlank();
  }

  userClickedOnRecipe(recipe_id): void {
    this.router.navigateByUrl('/recipes/' + recipe_id);
  }

  addNewRecipePressed(): void {
    this.router.navigateByUrl('/editnewrecipe');
  }

}
