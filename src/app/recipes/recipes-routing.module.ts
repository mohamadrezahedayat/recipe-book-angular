import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipeDetailComponent } from 'src/app/recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from 'src/app/recipes/recipes.component';
import { RecipeStartComponent } from 'src/app/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from 'src/app/recipes/recipe-edit/recipe-edit.component';
import { AuthGuard } from "src/app/auth/auth.guard";
import { RecipesResolverService } from "src/app/recipes/recipes-resolver.service";

const routes: Routes = [
  {
    path: '', 
    component: RecipesComponent,
    canActivate:[AuthGuard], 
    children:[
      {path:'', component: RecipeStartComponent},
      {path:'new', component: RecipeEditComponent},
      {path:':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path:':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ]
  },
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class RecipesRoutingModule{}