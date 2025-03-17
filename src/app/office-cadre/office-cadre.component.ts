import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ViewOfficeModalComponentComponent } from '../view-office-modal-component/view-office-modal-component.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-office-cadre',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './office-cadre.component.html',
  styleUrl: './office-cadre.component.css'
})
export class OfficeCadreComponent {

  constructor(@Inject(MatDialog) private dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  model = {
    office: '',
    mgr: '',
  };

  selectText(event: Event): void {
    const input = (event.target as HTMLSelectElement).value;
    console.log("Clicked:", input);
    this.openModal(input);
  }

  openModal(input: string): void {
    // Logic to open the modal
    console.log("Opening modal with input:", input);
    const dialogRef = this.dialog.open(ViewOfficeModalComponentComponent, {
      width: '10000px', // Set the width of the modal
      data: input, // Pass the row data to the modal
    });
    // You can use a modal service or any other logic to open the modal
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
      const modalContent = modal.querySelector('.modal-content');
      if (modalContent) {
        modalContent.textContent = `Input: ${input}`;
      }
    }
  }

  closeModal(): void {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onStateChange(event: Event): void {
    const selectedState = (event.target as HTMLSelectElement).value;
    console.log('Selected state:', selectedState);
  }
}
