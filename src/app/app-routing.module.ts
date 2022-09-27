import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthComponent } from "src/app/auth/auth.component";
import { AuthGuard } from "src/app/auth/auth.guard";
import { RecipeDetailComponent } from "src/app/recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "src/app/recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "src/app/recipes/recipe-start/recipe-start.component";
import { RecipesResolverService } from "src/app/recipes/recipes-resolver.service";
import { RecipesComponent } from "src/app/recipes/recipes.component";
import { ShoppingListComponent } from "src/app/shopping-list/shopping-list.component";

const appRoutes: Routes = [
  {path: '' , redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes' , component: RecipesComponent,
    canActivate:[AuthGuard], 
    children:[
      {path:'', component: RecipeStartComponent},
      {path:'new', component: RecipeEditComponent},
      {path:':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path:':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ]
  },
  {path: 'shopping-list' , component: ShoppingListComponent},
  {path: 'auth' , component: AuthComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}