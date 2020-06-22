import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetalsComponent } from './recipe-detals.component';

describe('RecipeDetalsComponent', () => {
  let component: RecipeDetalsComponent;
  let fixture: ComponentFixture<RecipeDetalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeDetalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
