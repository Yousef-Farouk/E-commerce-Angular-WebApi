
import { IOrderItem } from "./IorderItem"
export interface IOrder {

    Id : number

    OrderDate : Date
  
    Price : number
  
    UserId : string
  
    OrderItems : IOrderItem[]


}