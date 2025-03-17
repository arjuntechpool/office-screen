import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewOfficeModalComponentComponent } from '../view-office-modal-component/view-office-modal-component.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Office {
  Office_Name: string;
  Office_code: string;
}

@Component({
  selector: 'app-office-cadre',
  standalone: true,
  imports: [FormsModule,CommonModule],
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
    width: '800px',
    maxHeight: '80vh',
  });

  dialogRef.afterClosed().subscribe((selectedOffice: Office | undefined) => {
    if (selectedOffice) {
      this.model.office = selectedOffice.Office_Name; // Set selected office name
      this.populateOfficers(selectedOffice.Office_code); // Populate officers based on office code
    }
  });
}


  populateOfficers(officeCode: string): void {
    switch (officeCode) {
      case '998':
        this.officers = ['Manager 1', 'Manager 2', 'Manager 3'];
        break;
      case '999':
        this.officers = ['Manager A', 'Manager B'];
        break;
      case '1000':
        this.officers = ['Manager X', 'Manager Y', 'Manager Z'];
        break;
      default:
        this.officers = [];
    }
  }
}
