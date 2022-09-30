import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { ShoppingListComponent } from "src/app/shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "src/app/shopping-list/shopping-edit/shopping-edit.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations:[
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports:[
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      {path: 'shopping-list' , component: ShoppingListComponent}
    ]),
  ]  
})

export class ShoppingListModule{}