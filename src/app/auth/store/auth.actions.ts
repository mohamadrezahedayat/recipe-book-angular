import { Action } from "@ngrx/store";

export const LOGIN = '[Auth] login';
export const LOGOUT = '[Auth] logout';

export class login implements Action{
  readonly type= LOGIN;

  constructor(
    public payload:{
      email:string, 
      userId:string, 
      token:string, 
      expirationDate:Date}){} 
  
}

export class logout implements Action{
  readonly type = LOGOUT;
}

export type AuthActions = 
  |login
  |logout