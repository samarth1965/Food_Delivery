import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-update-dialogue-box',
  standalone: true,
  imports: [MatDialogModule,MatInputModule,MatButtonModule,FormsModule],
  templateUrl: './update-dialogue-box.component.html',
  styleUrl: './update-dialogue-box.component.css'
})
export class UpdateDialogueBoxComponent {
  foodName: string;
  foodCategory: string;

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogueBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.foodCategory='';
    this.foodName='';
    // Populate initial values if data is passed (for editing existing food)
    if (data) {
      this.foodName = data.foodName;
      this.foodCategory = data.foodCategory;
    }
  }

  onSubmit(): void {
    // Handle form submission here (update logic)
    debugger
    const updatedFood = {
      foodName: this.foodName,
      foodCategory: this.foodCategory
    };
    this.dialogRef.close(updatedFood);
  }

  onCancel(): void {
    this.dialogRef.close(); // Close dialog without returning any data
  }
}
