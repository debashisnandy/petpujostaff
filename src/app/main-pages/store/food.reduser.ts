import { FoodItem } from "../../shared/food.module";
import * as MenuAction from './food.action';

export interface State{
    foods:FoodItem[];
}

const initialState:State ={ 
    
    foods: []
}
export function foodItemReducer(state =initialState ,action:MenuAction.MenuAction){
    
    switch(action.type){
        case MenuAction.SET_RECIPE:
            return{
                ...state,
                foods: [...state.foods,action.payload]
            }
        case MenuAction.DELETE_RECIPE:
            const delMenuItems = [...state.foods];
            delMenuItems.splice(action.payload,1);
            return{
                ...state,
                foods: delMenuItems
            }
        case  MenuAction.EMPTY_RECIPE:
            return{
                ...state,
                foods: []
            }
        default:
        return state;
    }
    
    
}