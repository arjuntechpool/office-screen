import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewOfficeModalComponentComponent } from '../view-office-modal-component/view-office-modal-component.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

interface Office {
  Office_Name: string;
  Office_code: string;
}

interface Cadre {
  name: string;
  code: string;
}

interface TableData {
  slNo: number;
  office: string;
  officeCode: string;
  cadre: string;
  cadreCode: string;
  weight: number;
}

@Component({
  selector: 'app-office-cadre',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './office-cadre.component.html',
  styleUrls: ['./office-cadre.component.css'],
})
export class OfficeCadreComponent implements AfterViewInit {
  model = {
    office: '',
    officeCode: '',
    cadre: '', // cadre Name
  };

  displayedColumns: string[] = [
    'slNo',
    'office',
    'officeCode',
    'cadre',
    'cadreCode',
    'weight',
  ];
  dataSource = new MatTableDataSource<TableData>([]);

  // ✅ Independent cadre List (No Office Code Mapping)
  allCadre: Cadre[] = [
    { name: 'ASST', code: 'CADRE001' },
    { name: 'AM', code: 'CADRE002' },
    { name: 'MGR', code: 'CADRE003' },
    { name: 'OA', code: 'CADRE004' },
    { name: 'PTS', code: 'CADRE005' },
    { name: 'Others', code: 'CADRE006' },
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  selectText(event: Event): void {
    const dialogRef = this.dialog.open(ViewOfficeModalComponentComponent, {
      width: '800px',
      maxHeight: '100vh',
    });

    dialogRef.afterClosed().subscribe((selectedOffice: Office | undefined) => {
      if (selectedOffice) {
        this.model.office = selectedOffice.Office_Name;
        this.model.officeCode = selectedOffice.Office_code;
      }
    });
  }

  search(): void {
    if (this.model.office && this.model.cadre) {
      const selectedCadre = this.allCadre.find(
        (emp) => emp.name === this.model.cadre
      );

      const newEntry: TableData = {
        slNo: this.dataSource.data.length + 1,
        office: this.model.office,
        officeCode: this.model.officeCode,
        cadre: this.model.cadre, // Now it's just a string
        cadreCode: selectedCadre ? selectedCadre.code : 'N/A', // Correct lookup
        weight: Math.floor(Math.random() * 100),
      };

      this.dataSource.data = [...this.dataSource.data, newEntry];
      this.dataSource.paginator = this.paginator;
    }
  }
}
