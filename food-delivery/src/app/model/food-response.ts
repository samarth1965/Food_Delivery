import { ImageModelR } from "./image-model";

export class FoodResponse{
    constructor(){
        this.id=0;
        this.foodName='';
        this.foodCategory='';
        this.imageModelSet=[];
    }
    id: number;
    foodName : string;
    foodCategory:string;
    imageModelSet:ImageModelR[]
}