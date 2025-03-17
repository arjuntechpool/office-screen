import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface Office {
  code: string;
  head: string;
  shortDesc: string;
}

@Component({
  selector: 'app-view-office-modal-component',
  templateUrl: './view-office-modal-component.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
  ],
  styleUrls: ['./view-office-modal-component.component.css']
})
export class ViewOfficeModalComponentComponent implements OnInit {
  displayedColumns: string[] = ['code', 'head', 'shortDesc', 'action'];
  dataSource = new MatTableDataSource<Office>();
  searchQuery: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  offices: Office[] = [
    { code: '110010000', head: 'Property Tax (for General Purpose)', shortDesc: 'Property Tax' },
    { code: '110020000', head: 'Water Tax', shortDesc: 'Water Tax' },
    { code: '110030000', head: 'Sewerage Tax', shortDesc: 'Sewerage Tax' },
    // Add more offices as needed
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewOfficeModalComponentComponent>
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.offices;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
  }

  selectOffice(office: Office): void {
    this.dialogRef.close(office);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
