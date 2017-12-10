import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Location } from '@angular/common';

import { Recipe } from '../../model/recipe';
import { RecipeService } from '../../services/recipe.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe;

  load_error: boolean;
  error_text: string;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private recipe_service: RecipeService) {
    this.load_error = false;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const recipe_id = parseInt(params.get('recipe_id'), 10);
      this.recipe_service.getRecipeById(recipe_id)
          .then((recipe) => this.recipe = recipe)
          .catch((err) => {
            this.load_error = true;
            const body = JSON.parse(err._body);
            this.error_text = body.message;
          });
    });
  }

  goBackButtonPressed(): void {
    this.location.back();
  }

  imageUrl(img: string, defimg?: string): string {
    if (!img && defimg) {
      return defimg;
    }
    return RecipeService.imageUrl(img);
  }

}
