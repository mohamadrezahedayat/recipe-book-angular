import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from 'src/app/shopping-list/store/shopping-list.action';
import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromShoppingList.AppState>) {}

  ngOnInit(): void {
     this.subscription = this.store
      .select('shoppingList')
      .subscribe(stateData =>{
        if(stateData.editedIngredientIndex > -1){
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
          }else{
            this.editMode = false;
          }
       })
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient =  new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      )
    }else{
      this.store.dispatch(
        new ShoppingListActions.AddIngredient(newIngredient)
      );
    }
    form.reset();
    this.editMode = false;
  }

  onClear(){
    this.slForm.reset();
    this.store.dispatch(new ShoppingListActions.stopEdit());
  }

  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.stopEdit());
  }
}
