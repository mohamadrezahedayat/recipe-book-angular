import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { RecipeDetailComponent } from 'src/app/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from 'src/app/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from 'src/app/recipes/recipe-list/recipe-list.component';
import { RecipesComponent } from 'src/app/recipes/recipes.component';
import { RecipeStartComponent } from 'src/app/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from 'src/app/recipes/recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from "src/app/recipes/recipes-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations:[
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports:[
    RouterModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule
  ]  
})

export class RecipesModule{}