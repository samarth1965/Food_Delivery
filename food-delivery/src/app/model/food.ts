import { FileHandle } from "./file-handle.model";

export class Food{
    constructor(){
        this.id=0;
        this.foodName='';
        this.foodCategory='';
        this.imageModelSet=[];
    }
    id: number;
    foodName : string;
    foodCategory:string;
    imageModelSet:FileHandle[]
}