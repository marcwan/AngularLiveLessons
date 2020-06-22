import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { RecipePayload, Recipe } from '../recipe';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipe.service';

class MockRecipeService {
  getRecipeById(id: number): Observable<RecipePayload> {
    return new Observable<RecipePayload>((observable) => {
      const recipe = new Recipe(5, 'a', 'd', 1, 1, [], [], null, [], new Date().toString());
      const recipepayload = new RecipePayload();
      recipepayload.error = null;
      recipepayload.data = recipe;

      observable.next(recipepayload);
      observable.complete();
    });
  }
}

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageComponent ],
      providers: [{ provide: RecipeService, useClass: MockRecipeService }, HttpClient ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(MessageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the message "Hello there!" by default', () => {
    expect(component.message).toEqual('Hello there!');
  });

  it('should have the new message "Hi mum!" after we change it in code', () => {
    component.message = 'Hi mum!';
    expect(component.message).toEqual('Hi mum!');
  });

  it('should display the text "Hello there!" in a <p> element', () => {
    expect(fixture.nativeElement.querySelector('p').innerText).toEqual('Hello there!');
  });

  it('should have 5 divs, one for each of the letters in the letters property', () => {
    expect(fixture.debugElement.queryAll(By.css('div')).length).toEqual(5);
  });

  it('should fetch a recipe with id 5 using the recipe_service', () => {
    expect(component.recipe !== undefined).toBe(true);
    expect(component.recipe.id).toBe(5);
  });

});
