import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Recipe } from '../model/recipe';

const RECIPE_SERVER = 'http://localhost:8080';

@Injectable()
export class RecipeService {

  constructor(private http: Http) {
  }

  public static imageUrl(img: string): string {
    return `${RECIPE_SERVER}/images/${img}`;
  }

  getAllRecipes(): Promise<Recipe[]> {
    return this.http
        .get(RECIPE_SERVER + '/v1/recipes.json')
        .toPromise()
        .then(response => response.json().data as Recipe [])
        .catch(this.handleError);
  }

  getRecipeById(recipe_id: number): Promise<Recipe> {
    return this.http
        .get(RECIPE_SERVER + `/v1/recipes/${recipe_id}.json`)
        .toPromise()
        .then(response => response.json().data as Recipe)
        .catch(this.handleError);
  }

  // First, upload the recipe.
  // Second, upload the images.
  //
  // cover_photo:
  // preparation_photos_???
  addNewRecipe(recipe: Recipe, files: {}): Promise<Recipe> {
    return this.http
        .put(RECIPE_SERVER + '/v1/recipes.json', recipe)
        .toPromise()
        .then((response) => {
          const final_recipe: Recipe = response.json().data as Recipe;
          const formData: FormData = new FormData();

          if (files['cover_photo']) {
            const file: File = files['cover_photo'];
            formData.append('cover_photo', file, file.name);
          }
          if (files['instruction_photos']) {
            for (let i = 0; i < files['instruction_photos'].length; i++) {
              if (files['instruction_photos'][i]) {
                const file: File = files['instruction_photos'][i];
                formData.append('preparation_photos_' + i, file, file.name);
              }
            }
          }

          return this.http.post(RECIPE_SERVER + `/v1/recipes/${final_recipe.id}/images`, formData)
              .toPromise()
              .then(image_response => final_recipe)
              .catch(this.handleError);
        })
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('ERROR OCCURRED TALKING TO SERVER' + error);
    return Promise.reject(error.message || error);
  }
}
