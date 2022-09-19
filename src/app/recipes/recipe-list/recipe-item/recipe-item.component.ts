import { Component, OnInit,Input, } from '@angular/core';

import { Recipe } from 'src/app/recipes/recipe.model';
import { RecipeService } from 'src/app/recipes/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe:Recipe;
  
  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
  }

  onSelected(){
   this.recipeService.recipeSelected.emit(this.recipe);
  }
}
