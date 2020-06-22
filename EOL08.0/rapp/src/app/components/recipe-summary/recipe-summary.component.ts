import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';

@Component({
  selector: 'app-recipe-summary',
  templateUrl: './recipe-summary.component.html',
  styleUrls: ['./recipe-summary.component.css']
})
export class RecipeSummaryComponent {

  @Input()
  recipe: Recipe;

  @Output()
  recipeClicked: EventEmitter<number> = new EventEmitter();

  constructor() { }

  userClickedOnRecipe(): void {
    this.recipeClicked.emit(this.recipe.id);
  }

}
