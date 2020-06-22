import { Component, OnInit } from '@angular/core';

import { Recipe } from 'src/app/model/recipe';
import { Ingredient } from '../../model/recipe';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-new-recipe',
  templateUrl: './edit-new-recipe.component.html',
  styleUrls: ['./edit-new-recipe.component.css']
})
export class EditNewRecipeComponent implements OnInit {

  recipe_in_progress: Recipe;

  cover_photo_for_viewing: any = '/assets/emptybowl.jpg';
  cover_photo_for_upload: File;

  instruction_photos_for_viewing: any[];
  instruction_photos_for_upload: File[];

  constructor(private router: Router, private recipe_service: RecipeService) {
    this.recipe_in_progress = Recipe.createBlank();

    this.instruction_photos_for_viewing = [];
    this.instruction_photos_for_upload = [];
  }

  ngOnInit() {
  }

  addIngredientPressed(): void {
    if (!this.recipe_in_progress.ingredients) {
      this.recipe_in_progress.ingredients = [ { ingredient: null, measure: null } ];
    } else {
      this.recipe_in_progress.ingredients.push({ ingredient: null, measure: null });
    }
  }

  addInstructionPressed(): void {
    if (!this.recipe_in_progress.instructions) {
      this.recipe_in_progress.instructions = [ { instruction: null, photo: null } ];
    } else {
      this.recipe_in_progress.instructions.push({ instruction: null, photo: null });
    }
  }

  removeIngredientAtIndex(i: number): void {
    this.recipe_in_progress.ingredients.splice(i, 1);
  }

  removeInstructionAtIndex(i: number): void {
    this.recipe_in_progress.instructions.splice(i, 1);
  }

  readUrl(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (rdr) => {
        this.cover_photo_for_viewing = reader.result;
      };

      reader.readAsDataURL(event.target.files[0]);
      this.cover_photo_for_upload = event.target.files[0];
    }
  }

  readInstUrl(i: number, event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (rdr) => {
        this.instruction_photos_for_viewing[i] = reader.result;
      };

      reader.readAsDataURL(event.target.files[0]);
      this.instruction_photos_for_upload[i] = event.target.files[0];
    }
  }

  addRecipeClicked(): void {
    this.recipe_service.addRecipe(this.recipe_in_progress, {
      cover_photo: this.cover_photo_for_upload,
      instruction_photos: this.instruction_photos_for_upload,
    })
        .subscribe((recipe: Recipe) => {
          this.router.navigate(['/recipes', recipe.id]);
        });
  }

}
