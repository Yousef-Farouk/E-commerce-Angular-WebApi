export interface Iproduct{

    id:number ,
    name : string ,
    description : string ,
    price:number,
    quantity:number,
    image : File | null,
    imageUrl : string
    categoryId : number ,
    // couponId : number
}