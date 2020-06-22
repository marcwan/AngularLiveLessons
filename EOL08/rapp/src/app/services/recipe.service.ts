import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Recipe, RecipesPayload, RecipePayload } from '../model/recipe';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const RECIPE_SERVER = 'http://localhost:4200';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  httpOptions: object;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getAllRecipes(): Observable<RecipesPayload> {
    return this.http.get<RecipesPayload>(RECIPE_SERVER + '/v1/recipes.json')
      .pipe(catchError(this.handleError));

  }

  getRecipeById(recipe_id: number): Observable<RecipePayload> {
    if (recipe_id === undefined) {
      console.log('ACK! That\'s an error!');
      return;
    }

    return this.http.get<RecipePayload>(RECIPE_SERVER + '/v1/recipes/' + recipe_id + '.json')
      .pipe(catchError(this.handleError));
  }

  addRecipe(recipe: Recipe, files: {}): Observable<Recipe> {
    return new Observable<Recipe>((outer_observable) => {
      this.http.put<RecipePayload>(RECIPE_SERVER + '/v1/recipes.json', recipe, this.httpOptions)
        .subscribe((recipepayload) => {
          console.log(JSON.stringify(recipepayload, null, 2));

          const final_recipe: Recipe = recipepayload.data;
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

          this.http.post<Recipe>(RECIPE_SERVER + `/v1/recipes/${final_recipe.id}/images`, formData)
            .subscribe((sth) => {
              console.log(JSON.stringify(sth, null, 2));
              console.log(final_recipe);
              outer_observable.next(final_recipe);
              outer_observable.complete();
            });
        });
    });
  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(JSON.stringify(error, null, 2) +
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      error.error);
  }

}
