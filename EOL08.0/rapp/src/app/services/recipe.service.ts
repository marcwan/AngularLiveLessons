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

  addRecipe(recipe: Recipe): Observable<RecipePayload> {
    return this.http.put<RecipePayload>(RECIPE_SERVER + '/v1/recipes.json', recipe, this.httpOptions);
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
