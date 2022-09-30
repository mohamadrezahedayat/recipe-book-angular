import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AuthInterceptorService } from "src/app/auth/auth-interceptor.service";
import { RecipeService } from "src/app/recipes/recipe.service";
import { ShoppingListService } from "src/app/shopping-list/shopping-list.service";

@NgModule({
  providers:[
    ShoppingListService,
    RecipeService, 
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi: true
    }
  ]
})
export class CoreModule{}