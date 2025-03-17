import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewOfficeModalComponentComponent } from '../view-office-modal-component/view-office-modal-component.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-office-cadre',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './office-cadre.component.html',
  styleUrls: ['./office-cadre.component.css']
})
export class OfficeCadreComponent {
  model = {
    office: '',
    mgr: '',
  };

  officers: string[] = []; // Populate based on selected office

  constructor(private dialog: MatDialog) {}

  selectText(event: Event): void {
    const dialogRef = this.dialog.open(ViewOfficeModalComponentComponent, {
      width: '800px', // Set a fixed width
      maxHeight: '80vh', // Set a max height
    });

    dialogRef.afterClosed().subscribe((selectedOffice: any) => {
      if (selectedOffice) {
        this.model.office = selectedOffice.head;
      }
    });
  }

  populateOfficers(officeCode: string): void {
    // Example: Fetch officers based on office code
    if (officeCode === '110010000') {
      this.officers = ['Manager 1', 'Manager 2', 'Manager 3'];
    } else if (officeCode === '110020000') {
      this.officers = ['Manager A', 'Manager B'];
    }
    // Add more logic as needed
  }
}
