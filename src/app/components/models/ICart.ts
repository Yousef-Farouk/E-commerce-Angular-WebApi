import { ICartItem } from "./ICartItem"

export interface ICart{

    id : number 
    userId : string 
    cartItems: ICartItem[]
}