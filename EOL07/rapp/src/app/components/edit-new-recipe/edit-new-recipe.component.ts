import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from '../../model/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-edit-new-recipe',
  templateUrl: './edit-new-recipe.component.html',
  styleUrls: ['./edit-new-recipe.component.css']
})
export class EditNewRecipeComponent implements OnInit {

  recipe_in_progress: Recipe;


  constructor(private recipe_service: RecipeService,
              private router: Router) {
    this.recipe_in_progress = Recipe.createBlank();
  }

  ngOnInit() {
  }

  addIngredientPressed(): void {
    if (!this.recipe_in_progress.ingredients) {
      this.recipe_in_progress.ingredients = [ { ingredient: null, measure: null } ];
    } else {
      this.recipe_in_progress.ingredients.push({ ingredient: null, measure: null } );
    }
  }

  addInstructionPressed(): void {
    if (!this.recipe_in_progress.instructions) {
      this.recipe_in_progress.instructions = [ { instruction: null, photo: null } ];
    } else {
      this.recipe_in_progress.instructions.push({ instruction: null, photo: null } );
    }
  }

  removeIngredientAtIndex(index): void {
    this.recipe_in_progress.ingredients.splice(index, 1);
  }

  removeInstructionAtIndex(index): void {
    this.recipe_in_progress.instructions.splice(index, 1);
  }

  addRecipeClicked(): void {
    this.recipe_service.addNewRecipe(this.recipe_in_progress)
        .then((recipe) => {
          this.router.navigate(['recipes', recipe.id]);
        });
  }

  /*
  validateForm(event): void {

    this.disable_add_recipe_button = true;
    if (!this.recipe_in_progress.title || this.recipe_in_progress.title.length < 1) {
      return;
    }
    if (!this.recipe_in_progress.description || this.recipe_in_progress.description.length < 1) {
      return;
    }
    const feeds = parseInt('' + this.recipe_in_progress.feeds_this_many, 10);
    if (isNaN(feeds) || feeds < 1 || feeds > 1000) {
      return;
    }
    const preptime = parseInt('' + this.recipe_in_progress.preparation_time, 10);
    if (isNaN(preptime) || preptime < 1) {
      return;
    }

    for (const ingr of this.recipe_in_progress.ingredients) {
      if (!ingr.ingredient || ingr.ingredient.length < 1) {
        return;
      }
      if (!ingr.measure || ingr.measure.length < 1) {
        return;
      }
    }

    for (const instr of this.recipe_in_progress.instructions) {
      if (!instr.instruction || instr.instruction.length < 1) {
        return;
      }
    }


    this.disable_add_recipe_button = false;
  }
  */

}
