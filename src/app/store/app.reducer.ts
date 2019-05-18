
import * as fromRecipe from '../main-pages/store/food.reduser';
import * as fromOrder from '../main-pages/recive-order/store/order.reduser';
import { ActionReducerMap } from '@ngrx/store';

import { auth } from 'firebase';

export interface AppState{
    foodItem: fromRecipe.State;
    orderItem: fromOrder.State;
}

export const reducer:ActionReducerMap<AppState> = {
    foodItem: fromRecipe.foodItemReducer,
    orderItem: fromOrder.orderItemReducer
}

