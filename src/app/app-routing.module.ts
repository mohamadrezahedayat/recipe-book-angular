import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RecipeDetailComponent } from "src/app/recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "src/app/recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "src/app/recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "src/app/recipes/recipes.component";
import { ShoppingListComponent } from "src/app/shopping-list/shopping-list.component";

const appRoutes: Routes = [
  {path: '' , redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes' , component: RecipesComponent, children:[
    {path:'', component: RecipeStartComponent},
    {path:'new', component: RecipeEditComponent},
    {path:':id', component: RecipeDetailComponent},
    {path:':id/edit', component: RecipeEditComponent},
  ]},
  {path: 'shopping-list' , component: ShoppingListComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}