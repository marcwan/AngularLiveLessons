import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  message: string;

  letters = [
    'a', 'b', 'c', 'd', 'e'
  ];

  recipe: Recipe;

  constructor(private recipe_service: RecipeService) {
    this.message = 'Hello there!';
  }

  ngOnInit() {
      this.recipe_service.getRecipeById(5)
          .then((recipe) => this.recipe = recipe);
  }

}
