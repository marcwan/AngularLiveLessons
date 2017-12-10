import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../model/recipe';

@Component({
  selector: 'app-edit-new-recipe',
  templateUrl: './edit-new-recipe.component.html',
  styleUrls: ['./edit-new-recipe.component.css']
})
export class EditNewRecipeComponent implements OnInit {

  recipe_in_progress: Recipe;

  constructor() {
    this.recipe_in_progress = Recipe.createBlank();
    console.log(this.recipe_in_progress);
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

}
