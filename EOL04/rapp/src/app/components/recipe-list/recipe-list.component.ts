import { Component } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  recipes: Recipe[];

  constructor() {
    this.recipes = [
      new Recipe('Banana bread',
        'This is very delicious banana bread that we used to make back home when I was a child.',
         4, 60, null, null, null),
      new Recipe('Farmstead tofu',
        'A very spicy tofu dish from Hunan province with spicy peppers, some meat, and all sorts of yummy sauce',
         2, 15, null, null, null),
      new Recipe('Spaghetti Carbonara',
        'Delicious cheese, eggs, and spaghetti -- preparation can be tricky though, so be sure to practice!',
         2, 25, null, null, null)
    ];
  }
}
