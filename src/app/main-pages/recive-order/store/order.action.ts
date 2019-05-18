import { Action } from '@ngrx/store';
import { OrderItem } from 'src/app/shared/order.module';


export const SET_ORDER = "SET_ORDER";
export const MODIFY_ORDER = "MODIFY_ORDER";
export const EMPTY_ORDER = "EMPTY_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";

export class SetOrder implements Action{
    readonly type = SET_ORDER;
    constructor(public payload:OrderItem){}
}

export class ModifyOrder implements Action{
    readonly type = MODIFY_ORDER;
    constructor(public payload:{index:number,item:OrderItem}){}
}

export class Empty_Order implements Action{
    readonly type = EMPTY_ORDER;
}

export class DeleteOrder implements Action{
    readonly type = DELETE_ORDER;
    constructor(public payload:number){}
}

export type OrderAction = SetOrder |
                        ModifyOrder |
                        Empty_Order |
                        DeleteOrder ;