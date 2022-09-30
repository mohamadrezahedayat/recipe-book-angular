import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from 'src/app/shopping-list/store/shopping-list.action';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit {
  ingredients : Observable<{ingredients:Ingredient[]}>;
  
  constructor(private store: Store< fromApp.AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(index:number){
    this.store.dispatch(new ShoppingListActions.startEdit(index));
  }

  ngOnDestroy(): void {
  }
}
