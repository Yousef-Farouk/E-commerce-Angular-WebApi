import { IOrderItem } from "./IorderItem";
import { ICreateOrderItem } from "./IcreateOrderItem";

export interface ICreateOrder{

    orderItems : ICreateOrderItem[] 
}