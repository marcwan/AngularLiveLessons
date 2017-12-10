import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MessageComponent } from './message.component';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { HttpModule, Http } from '@angular/http';


class MockRecipeService {
  getRecipeById(id: number): Promise<Recipe> {
    return Promise.resolve(new Recipe(5, 't', 'd', 4, 60, [], [], null, [], new Date().toString()));
  }
}

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageComponent ],
      providers: [ { provide: RecipeService, useClass: MockRecipeService }, HttpModule ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(MessageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

//  beforeEach(() => {
//  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the message "Hello there!" by default', () => {
    expect(component.message).toEqual('Hello there!');
  });

  it('should have the message "Hi, mom!" after we change the value', () => {
    component.message = 'Hi, mom!';
    expect(component.message).toEqual('Hi, mom!');
  });

  it('should display the text "Hello there!" in a <p> by default', () => {
    expect(fixture.nativeElement.querySelector('p').innerText).toEqual('Hello there!');
  });

  it('should have 5 dics for each of the letters', () => {
    expect(fixture.debugElement.queryAll(By.css('div')).length).toBe(5);
  });

  it('should fetch a fake recipe with id 5', () => {
    expect(component.recipe !== undefined).toBe(true);
    expect(component.recipe.id).toBe(5);
  });
});
