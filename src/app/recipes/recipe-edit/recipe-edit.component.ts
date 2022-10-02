import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

import * as fromApp from 'src/app/store/app.reducer';
import * as RecipesActions from 'src/app/recipes/store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit,OnDestroy {
  id:number;
  editMode = false;
  recipeForm:FormGroup;
  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private store: Store<fromApp.AppState>,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  onSubmit(){
   if(this.editMode){
    this.store.dispatch(new RecipesActions.UpdateRecipe({index:this.id,newRecipe:this.recipeForm.value}));
   }else{
    this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
   }
   this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  private initForm(){
    let recipeName ='';
    let recipeImagePath ='';
    let recipeDescription ='';
    let recipeIngredients = new FormArray([]);
    
    if(this.editMode){
      // const recipe = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store.select('recipes')
        .pipe(
          map(recipesState=>{
            return recipesState.recipes.find((_recipes,index)=>{
              return index === this.id;
          })})
        )
        .subscribe(recipe=>{
          recipeName = recipe.name;
          recipeImagePath=recipe.imagePath;
          recipeDescription= recipe.description;
    
          if(recipe['ingredients']){
            for(let ingredient of recipe.ingredients){
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name, Validators.required),
                  'amount': new FormControl(ingredient.amount,[
                    Validators.required, 
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ]),
                })
              )
            }
          }

        })
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
    })
  }

  // a getter!
  get ingredientsControls() { 
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    const a = (<FormArray>this.recipeForm.get('ingredients')).push( new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null,[
        Validators.required, 
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
    }))
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  ngOnDestroy(): void {
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }
}
