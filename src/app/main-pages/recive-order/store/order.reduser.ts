
import * as OrderAction from './order.action';
import { OrderItem } from 'src/app/shared/order.module';

export interface State{
    orders:OrderItem[];
}

const initialState:State ={ 
    
    orders: []
}
export function orderItemReducer(state =initialState ,action:OrderAction.OrderAction){
    
    switch(action.type){
        case OrderAction.SET_ORDER:
            return{
                ...state,
                orders: [...state.orders,action.payload]
            }
        case OrderAction.MODIFY_ORDER:
            const orderItem = state.orders[action.payload.index];
            const updateorderItem = {
                ...orderItem,
                ...action.payload.item
            }
            const orderItems = [...state.orders];
            orderItems[action.payload.index] = updateorderItem;
            
            return{
                ...state,
                orders: orderItems
            }
        case OrderAction.DELETE_ORDER:
            const delOrderItems = [...state.orders];
            delOrderItems.splice(action.payload,1);
            return{
                ...state,
                orders: delOrderItems
            }
        case  OrderAction.EMPTY_ORDER:
            return{
                ...state,
                orders: []
            }
        default:
        return state;
    }
    
    
}