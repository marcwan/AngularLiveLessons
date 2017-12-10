import { Directive, ElementRef, Renderer, Input, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe';

@Directive({ selector: '[appHighlightNewRecipe]'})
export class HighlightNewRecipeDirective implements OnInit {

    @Input('appHighlightNewRecipe')
    recipe_to_test: Recipe;

    @Input('highlightnewrecipe_colour')
    highlight_colour: string;

    constructor(private el: ElementRef, private renderer: Renderer) {
        this.highlight_colour = 'yellow';
     }

    ngOnInit(): void {
        console.log(this.recipe_to_test);
        const date_added = new Date(this.recipe_to_test.date_added).getTime();
        if (new Date().getTime() - 4 * 86400000 < date_added) {
            this.renderer.setElementStyle(this.el.nativeElement, 'background-color', this.highlight_colour);
        }
    }
}
