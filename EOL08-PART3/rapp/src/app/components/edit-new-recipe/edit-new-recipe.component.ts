import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, ValidatorFn, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Recipe } from '../../model/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-edit-new-recipe',
  templateUrl: './edit-new-recipe.component.html',
  styleUrls: ['./edit-new-recipe.component.css']
})
export class EditNewRecipeComponent implements OnInit {

  recipe_in_progress: Recipe;

  recipeForm: FormGroup;

  constructor(private recipe_service: RecipeService,
              private router: Router) {
    this.recipe_in_progress = Recipe.createBlank();

    this.buildFormGroup();
  }

  ngOnInit() {
  }

  buildFormGroup(): void {
    const fg = {
      'title' : new FormControl(this.recipe_in_progress.title, [Validators.required, noTunaCasseroleValidator()]),
      'description' : new FormControl(this.recipe_in_progress.description, [Validators.required]),
      'preparation_time' : new FormControl(this.recipe_in_progress.preparation_time, [Validators.required, Validators.min(1)]),
      'feeds_this_many' : new FormControl(this.recipe_in_progress.feeds_this_many,
                                          [Validators.required, Validators.min(1), Validators.max(1000)]),
    };

    for (let i = 0; i < this.recipe_in_progress.ingredients.length; i++) {
      fg['ingredient_' + i] = new FormControl(this.recipe_in_progress.ingredients[i].ingredient, [Validators.required]);
      fg['measure_' + i] = new FormControl(this.recipe_in_progress.ingredients[i].measure, [Validators.required]);
    }

    for (let i = 0; i < this.recipe_in_progress.instructions.length; i++) {
      fg['instruction_' + i] = new FormControl(this.recipe_in_progress.instructions[i].instruction, [Validators.required]);
    }

    this.recipeForm = new FormGroup(fg);

  }

  addIngredientPressed(): void {
    if (!this.recipe_in_progress.ingredients) {
      this.recipe_in_progress.ingredients = [ { ingredient: null, measure: null } ];
    } else {
      this.recipe_in_progress.ingredients.push({ ingredient: null, measure: null } );
    }

    this.buildFormGroup();
  }

  addInstructionPressed(): void {
    if (!this.recipe_in_progress.instructions) {
      this.recipe_in_progress.instructions = [ { instruction: null, photo: null } ];
    } else {
      this.recipe_in_progress.instructions.push({ instruction: null, photo: null } );
    }
    this.buildFormGroup();
  }

  removeIngredientAtIndex(index): void {
    this.recipe_in_progress.ingredients.splice(index, 1);
    this.buildFormGroup();
  }

  removeInstructionAtIndex(index): void {
    this.recipe_in_progress.instructions.splice(index, 1);
    this.buildFormGroup();
  }

  addRecipeClicked(): void {
    this.recipe_service.addNewRecipe(this.recipe_in_progress)
        .then((recipe) => {
          this.router.navigate(['recipes', recipe.id]);
        });
  }
}

export function noTunaCasseroleValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (control.value.toLowerCase().indexOf('tuna') !== -1
        && control.value.toLowerCase().indexOf('casserole') !== -1) {
      return { 'noTunaCasserole': { value: control.value } };
    }

    return null;
  };
}

