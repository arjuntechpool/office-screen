import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-office-modal-component',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './view-office-modal-component.component.html',
  styleUrl: './view-office-modal-component.component.css'
})
export class ViewOfficeModalComponentComponent {

  office = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewOfficeModalComponentComponent> // Inject MatDialogRef
  ) {}

  // Method to handle the Close button
  onClose() {
    this.dialogRef.close(0); // Return 0 for Close
  }
  onClick() {
    this.dialogRef.close({ action: 1}); // Return 1 for Approve with remarks
  }
}
