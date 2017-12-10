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

  cover_photo_for_viewing = '/assets/emptybowl.jpg';
  instruction_photos_for_viewing: string[];

  cover_photo_for_upload: File;
  instruction_photos_for_upload: File[];

  recipe_in_progress: Recipe;

  constructor(private recipe_service: RecipeService,
              private router: Router) {
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
      this.recipe_in_progress.ingredients.push({ ingredient: null, measure: null } );
    }
  }

  addInstructionPressed(): void {
    if (!this.recipe_in_progress.instructions) {
      this.recipe_in_progress.instructions = [ { instruction: null, photo: null } ];
      this.instruction_photos_for_viewing = [];
      this.instruction_photos_for_upload = [];
    } else {
      this.recipe_in_progress.instructions.push({ instruction: null, photo: null } );
      this.instruction_photos_for_viewing.push(null);
      this.instruction_photos_for_upload.push(null);
    }
  }

  removeIngredientAtIndex(index): void {
    this.recipe_in_progress.ingredients.splice(index, 1);
  }

  removeInstructionAtIndex(index): void {
    this.recipe_in_progress.instructions.splice(index, 1);
    this.instruction_photos_for_viewing.splice(index, 1);
    this.instruction_photos_for_upload.splice(index, 1);
  }

  addRecipeClicked(): void {
    this.recipe_service.addNewRecipe(this.recipe_in_progress, {
      cover_photo: this.cover_photo_for_upload,
      instruction_photos: this.instruction_photos_for_upload
    })
        .then((recipe) => {
          this.router.navigate(['recipes', recipe.id]);
        });
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
}
