import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../../model/recipe';

@Component({
  selector: 'app-recipe-summary',
  templateUrl: './recipe-summary.component.html',
  styleUrls: ['./recipe-summary.component.css']
})
export class RecipeSummaryComponent  {

  @Input()
  recipe: Recipe;

  @Output() userClick: EventEmitter<number> = new EventEmitter();

  constructor() { }

  userClicked() {
    this.userClick.emit(this.recipe.id);
  }
}
