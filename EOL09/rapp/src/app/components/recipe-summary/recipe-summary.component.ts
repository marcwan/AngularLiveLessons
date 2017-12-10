import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../../model/recipe';
import { RecipeService } from '../../services/recipe.service';
import { HighlightNewRecipeDirective } from '../../misc/highlightnewrecipe.directive';

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

  imageUrl(img: string, defimg?: string): string {
    if (!img && defimg) {
      return defimg;
    }
    return RecipeService.imageUrl(img);
  }

}
