import { Component } from '@angular/core';
import { Recipe } from './model/recipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  recipes: Recipe[];

  constructor() {
    this.recipes = [
      new Recipe('Banana Bread',
      'This is my favourite banana bread recipe! My mother taught me how to make this one warm summer afternoon',
       null, null, null),
       new Recipe('Homstead Tofu',
       'This is a dish from rural Hunan province in China and has tofu, some flavouring, and lots of chili peppers',
       null, null, null),
    ];
  }

}
