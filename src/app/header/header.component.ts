import {Component, OnDestroy, OnInit} from '@angular/core'
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/auth/store/auth.actions';
import * as RecipesActions from 'src/app/recipes/store/recipe.actions';

@Component({
  selector:'app-header',
  templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private store: Store<fromApp.AppState>){}
    
    ngOnInit(): void {
      this.userSub = this.store
        .select('auth')
        .pipe(map(userState=>userState.user))
        .subscribe(user =>{
        this.isAuthenticated = !!user;
      });
    }
    
    onSaveData(){
      this.store.dispatch(new RecipesActions.StoreRecipes());
    }
    
    onFetchData(){
      this.store.dispatch(new RecipesActions.FetchRecipes());
    }

    onLogout(){
      this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy(): void {
      this.userSub.unsubscribe();
    }
}