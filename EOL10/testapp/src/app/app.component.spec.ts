import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { HttpModule } from '@angular/http';
import { RecipeService } from './recipe.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [
        AppComponent,
        MessageComponent
      ],
      providers: [ RecipeService, HttpModule ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
