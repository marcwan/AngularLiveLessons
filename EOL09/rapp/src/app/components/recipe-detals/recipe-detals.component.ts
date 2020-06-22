import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Location } from '@angular/common';

import { Recipe, RecipePayload } from 'src/app/model/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detals',
  templateUrl: './recipe-detals.component.html',
  styleUrls: ['./recipe-detals.component.css']
})
export class RecipeDetalsComponent implements OnInit {

  recipe_loaded: boolean;
  load_error: object;
  recipe: Recipe;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private recipe_service: RecipeService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const recipe_id = parseInt(params.get('recipe_id'), 10);

      this.recipe_service.getRecipeById(recipe_id)
        .subscribe(
          (recipepayload) => {
            this.recipe = recipepayload.data;
            this.recipe_loaded = true;

            console.log(recipepayload.error);
          },
          (error) => {
            this.load_error = error;
            console.log(JSON.stringify(error, null, 2));
          }
        );
    });
  }

  goBackButtonClicked(): void {
    this.location.back();
  }

  coverPhotoPath(): string {
    if (this.recipe.cover_photo) {
      return 'http://localhost:4200/images/' + this.recipe.cover_photo;
    } else {
      return '/assets/emptybowl.jpg';
    }
  }

  instructionPhotoPath(i: number): string {
    if (this.recipe.instructions[i].photo) {
      return 'http://localhost:4200/images/' + this.recipe.instructions[i].photo;
    }
  }

}
