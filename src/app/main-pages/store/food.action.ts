import { Action } from '@ngrx/store';
import { FoodItem } from '../../shared/food.module';


export const SET_RECIPE = "SET_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const EMPTY_RECIPE = "EMPTY_RECIPE";

export class SetMenu implements Action{
    readonly type = SET_RECIPE;
    constructor(public payload:FoodItem){}
}

export class DeleteMenu implements Action{
    readonly type = DELETE_RECIPE;
    constructor(public payload:number){}
}

export class Empty_Recipe implements Action{
    readonly type = EMPTY_RECIPE;
}

export type MenuAction = SetMenu |
                        DeleteMenu |
                        Empty_Recipe ;