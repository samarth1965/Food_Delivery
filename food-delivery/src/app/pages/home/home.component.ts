import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FoodServiceService } from '../../services/food-service.service';
import { Food } from '../../model/food';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UpdateDialogueBoxComponent } from '../update-dialogue-box/update-dialogue-box.component';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'console';
import { FoodResponse } from '../../model/food-response';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  foods: FoodResponse[] = [];
  constructor(private foodService: FoodServiceService,public dialog: MatDialog){

  }
    
  ngOnInit(): void {
    // localStorage.setItem('foodId',)
    // this.foodService.getPosts().subscribe(
    //   data=>{
    //       this.foods=data;
    //   }
    // )
    this.loadFood()
  }

  loadFood(){
    this.foodService.getPosts().subscribe(
      data=>{
          this.foods=data;
      }
    )
  }

  updateFood(food: FoodResponse) {
    // Implement your update logic here (e.g., navigate to update page)

    const dialogRef = this.dialog.open(UpdateDialogueBoxComponent, {
      width: '400px',
      data: { foodName: food.foodName, foodCategory: food.foodCategory }
    });

    dialogRef.afterClosed().subscribe(result => {
      debugger
      if (result) {
        // Perform update operation with the updated values (result)
        food.foodCategory=result.foodCategory
        food.foodName=result.foodName
        this.foodService.updateFood(food,food.id).subscribe(
          data=>{
            console.log(data);
          },
          error=>{
            console.log(error);
          }
        )
        // Here you can call a service method to update the food item
        // For example: this.foodService.updateFood(food.id, result);
      }
    });
  }

  deleteFood(food:FoodResponse){
    debugger
    this.foodService.deleteFood(food.id).subscribe(
      data=>{
        alert(data)
      }
    )
    this.foods = this.foods.filter(foodq => foodq.id !== food.id);
  }

}
